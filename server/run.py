import asyncio
import websockets


async def echo(ws, path):
    async for message in ws:
        print(f'<< {message}')
        await ws.send(message)

serve = websockets.serve(echo, 'localhost', 9000)

asyncio.get_event_loop().run_until_complete(serve)
asyncio.get_event_loop().run_forever()
