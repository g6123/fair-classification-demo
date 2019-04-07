import json

import asyncio
import websockets

import numpy as np
from sklearn.metrics import confusion_matrix

from app import actions
from app.datasets import datasets
from app.methods import methods
from app.visualizers import visualizers


async def handle(ws, path):
    async def send_message(message):
        return await ws.send(json.dumps(message))

    async for message in ws:
        action = json.loads(message)
        action_type = action.get('type', None)

        if action_type == 'FETCH_DATASET':
            dataset_name = action.get('name', None)

            if dataset_name not in datasets:
                return await send_message(actions.set_error("Unknown dataset name"))

            Dataset = datasets[dataset_name]
            dataset = Dataset(train=False)

            await send_message(actions.set_dataset(dataset))
        elif action_type == 'APPLY_METHOD':
            method_type = action.get('method', {}).get('type', None)
            dataset_name = action.get('dataset', None)
            visualizer_type = action.get('visualizer', None)

            if method_type not in methods:
                return await send_message(actions.set_error("Unkown method type"))

            if dataset_name not in datasets:
                return await send_message(actions.set_error("Unknown dataset name"))

            if visualizer_type not in visualizers:
                return await send_message(actions.set_error("Unkown visualizer type"))

            method = methods[method_type]

            Dataset = datasets[dataset_name]
            train_dataset = Dataset(test=False)
            test_dataset = Dataset(train=False)

            visualizer = visualizers[visualizer_type]

            for message in method(train_dataset, test_dataset, visualizer, action):
                await send_message(message)
        else:
            await send_message(actions.set_error("Unknown action type"))


serve = websockets.serve(handle, 'localhost', 9000)

asyncio.get_event_loop().run_until_complete(serve)
asyncio.get_event_loop().run_forever()
