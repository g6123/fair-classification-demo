import { observable } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { noop } from '../utils/misc';
import { debugStore } from './debug';

export type MessageSender = (message: any) => void;
export type MessageHandler = (message: any, event: MessageEvent) => void;
export type ErrorHandler = (error: Event) => void;

class SocketStore {
  public ws: WebSocket;

  @observable
  public status: number;

  public constructor() {
    this.ws = new WebSocket(SERVER_URI);

    this.status = this.ws.readyState;

    this.ws.addEventListener('open', () => {
      this.status = WebSocket.OPEN;
      debugStore.log('info', `Socket connected to ${SERVER_URI}`);
    });

    this.ws.addEventListener('message', (event: MessageEvent) => {
      debugStore.log('debug', `Socket message received: ${event.data}`);
    });

    this.ws.addEventListener('error', () => {
      debugStore.log('error', 'Socket connection error');
    });

    this.ws.addEventListener('close', () => {
      this.status = WebSocket.CLOSED;
      debugStore.log('info', 'Socket connection closed');
    });
  }

  public sendMessage = (message: any) => {
    const data = JSON.stringify(message);

    this.ws.send(data);
    debugStore.log('debug', `Socket message sent: ${data}`);
  };
}

export const socketStore = new SocketStore();

export const useSocket = (onMessage: MessageHandler = noop, onError: ErrorHandler = noop): SocketStore => {
  const store = useObservable(socketStore);

  const handleMessage = (event: MessageEvent): void => {
    onMessage(JSON.parse(event.data), event);
  };

  const handleError = (event: Event): void => {
    onError(event);
  };

  useEffect(() => {
    if (onMessage !== noop) {
      store.ws.addEventListener('message', handleMessage);
    }

    if (onError !== noop) {
      store.ws.addEventListener('error', handleError);
    }

    return () => {
      store.ws.removeEventListener('message', handleMessage);
      store.ws.removeEventListener('error', handleError);
    };
  });

  return store;
};
