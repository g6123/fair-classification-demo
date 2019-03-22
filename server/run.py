import json
from pprint import pprint

import asyncio
import websockets

import numpy as np
from sklearn.linear_model import LinearRegression
import torch

from app.datasets import datasets
from app.classifiers import classifiers
from app.datasets.reshape import ReshapeDataset


async def handle(ws, path):
    async for message in ws:
        action = json.loads(message)
        action_type = action.get('type', None)

        if action_type == 'FETCH_DATASET':
            dataset_name = action.get('name', None)

            if dataset_name in datasets:
                Dataset = datasets[dataset_name]
                dataset = Dataset(train=False)

                response = {'name': dataset_name}
                response.update(dataset.df.to_dict(orient='split'))
                response.pop('index')

                await send_action(ws, 'SET_DATASET', response)
            else:
                await send_action(ws, 'SET_ERROR', {'message': "Unknown dataset name"})
        elif action_type == 'APPLY_METHOD':
            dataset_name = action.get('dataset', None)
            method_type = action.get('method', {}).get('type', None)
            classifier_type = action.get('method', {}).get('classifier')

            if dataset_name in datasets:
                Dataset = datasets[dataset_name]

                train_dataset = Dataset(test=False)
                test_dataset = Dataset(train=False)

                if method_type == 'none':
                    if classifier_type in classifiers:
                        Classifier = classifiers[classifier_type]
                        classifier = Classifier(train_dataset, test_dataset)

                        for epoch in classifier.fit():
                            await send_action(ws, 'SET_POINTS', {
                                'epoch': [epoch + 1, classifier.epochs],
                                'grounds': test_dataset.y.tolist(),
                                **classifier.predict(),
                            })
                    else:
                        await send_action(ws, 'SET_ERROR', {'message': "Unkown classifier type"})
                else:
                    await send_action(ws, 'SET_ERROR', {'message': "Unkown bias mitigation method"})
            else:
                await send_action(ws, 'SET_ERROR', {'message': "Unknown dataset name"})
        else:
            await send_action(ws, 'SET_ERROR', {'message': "Unknown action type"})


async def send_action(ws, action_type, data):
    await send_message(ws, {'type': action_type, **data})


async def send_message(ws, message):
    await ws.send(json.dumps(message))

serve = websockets.serve(handle, 'localhost', 9000)

asyncio.get_event_loop().run_until_complete(serve)
asyncio.get_event_loop().run_forever()
