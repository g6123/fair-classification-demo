import asyncio
import websockets
import json

from app.datasets import datasets


async def handle(ws, path):
    async for message in ws:
        message = json.loads(message)

        if message['type'] == 'dataset':
            response = {'type': 'dataset', 'name': message['name']}

            Dataset = datasets[message['name']]
            dataset = Dataset(message.get('options', {}))

            response.update(dataset.df.to_dict(orient='split'))
            response.pop('index')

            await ws.send(json.dumps(response))
        else:
            await ws.send({'type': 'error', 'message': 'Unknown action type'})

serve = websockets.serve(handle, 'localhost', 9000)

asyncio.get_event_loop().run_until_complete(serve)
asyncio.get_event_loop().run_forever()
