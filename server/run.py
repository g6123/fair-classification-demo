import json

import asyncio
import websockets

import numpy as np
from sklearn.metrics import confusion_matrix

from app.datasets import datasets
from app.classifiers import classifiers
from app.visualizers import visualizers
from app.utils import scale


async def handle(ws, path):
    async for message in ws:
        action = json.loads(message)
        action_type = action.get('type', None)

        if action_type == 'FETCH_DATASET':
            dataset_name = action.get('name', None)

            if dataset_name not in datasets:
                return await send_action(ws, 'SET_ERROR', {'message': "Unknown dataset name"})

            Dataset = datasets[dataset_name]
            dataset = Dataset(train=False)

            response = {'name': dataset_name}
            response.update(dataset.df.to_dict(orient='split'))
            response.pop('index', None)

            await send_action(ws, 'SET_DATASET', response)
        elif action_type == 'APPLY_METHOD':
            dataset_name = action.get('dataset', None)
            method_type = action.get('method', {}).get('type', None)
            visualizer_type = action.get('visualizer', None)

            if dataset_name not in datasets:
                return await send_action(ws, 'SET_ERROR', {'message': "Unknown dataset name"})

            if visualizer_type not in visualizers:
                return await send_action(ws, 'SET_ERROR', {'message': "Unkown visualizer type"})


            Dataset = datasets[dataset_name]

            train_dataset = Dataset(test=False)
            test_dataset = Dataset(train=False)

            visualizer = visualizers[visualizer_type]

            if method_type == 'none':
                classifier_type = action.get('method', {}).get('classifier', {}).get('type', None)

                if classifier_type not in classifiers:
                    return await send_action(ws, 'SET_ERROR', {'message': "Unkown classifier type"})

                Classifier = classifiers[classifier_type]
                classifier = Classifier(train_dataset, test_dataset)

                for epoch in classifier.fit():
                    y_ = classifier.predict()

                    z_ = visualizer(test_dataset, y_)
                    z_ = scale(z_)

                    y = test_dataset.y
                    y_ = np.argmax(y_, axis=1)

                    await send_action(ws, 'SET_POINTS', {
                        'epoch': [epoch + 1, classifier.epochs],
                        'grounds': y.tolist(),
                        'predictions': y_.tolist(),
                        'positions': z_.tolist(),
                        'reports': {k: confusion_matrix(y[v], y_[v]).tolist() for k, v in test_dataset.ilocs.items()},
                    })
            else:
                await send_action(ws, 'SET_ERROR', {'message': "Unkown bias mitigation method"})
        else:
            await send_action(ws, 'SET_ERROR', {'message': "Unknown action type"})


async def send_action(ws, action_type, data):
    return await send_message(ws, {'type': action_type, **data})


async def send_message(ws, message):
    return await ws.send(json.dumps(message))

serve = websockets.serve(handle, 'localhost', 9000)

asyncio.get_event_loop().run_until_complete(serve)
asyncio.get_event_loop().run_forever()
