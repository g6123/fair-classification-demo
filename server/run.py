import json
from pprint import pprint

import asyncio
import websockets

import numpy as np
from sklearn.linear_model import LinearRegression

from app.datasets import datasets


async def handle(ws, path):
    async for message in ws:
        message = json.loads(message)

        if message['type'] == 'FETCH_DATASET':
            response = {'type': 'SET_DATASET', 'name': message['name']}

            Dataset = datasets[message['name']]
            dataset = Dataset()

            response.update(dataset.df.to_dict(orient='split'))
            response.pop('index')

            await ws.send(json.dumps(response))
        elif message['type'] == 'APPLY_METHOD':
            Dataset = datasets[message['dataset']]
            dataset = Dataset()

            if message['method']['type'] == 'none':
                if message['method']['classifier'] == 'lr':
                    lr = LinearRegression().fit(dataset.x, dataset.y)
                    y_ = lr.predict(dataset.x)
                    y_ = np.stack((y_, y_ * -1), axis=-1)

                    await ws.send(json.dumps({
                        'type': 'SET_POINTS',
                        'positions': y_.tolist(),
                        'predictions': np.argmax(y_, axis=1).tolist(),
                        'grounds': dataset.y.tolist()
                    }))
                # elif message['method']['classifier'] == 'nn':
                #     pass
                else:
                    await ws.send(json.dumps({'type': 'SET_ERROR', 'message': 'Unkown classifier type'}))
            else:
                await ws.send(json.dumps({'type': 'SET_ERROR', 'message': 'Unkown bias mitigation method'}))
        else:
            await ws.send(json.dumps({'type': 'SET_ERROR', 'message': 'Unknown action type'}))


serve = websockets.serve(handle, 'localhost', 9000)

asyncio.get_event_loop().run_until_complete(serve)
asyncio.get_event_loop().run_forever()
