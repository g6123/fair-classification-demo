import EventEmitter from 'eventemitter3';
import { observable } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { noop } from '../utils/misc';

export type MessageSender = (message: any) => void;
export type MessageHandler = (message: any, event: MessageEvent) => void;
export type ErrorHandler = (error: Event) => void;

class SocketStore extends EventEmitter {
  public ws: WebSocket;

  @observable
  public status: number;

  public constructor() {
    super();

    this.ws = new WebSocket(SERVER_URI);

    this.status = this.ws.readyState;

    this.ws.addEventListener('open', () => {
      this.status = WebSocket.OPEN;
      this.emit('open');
    });

    this.ws.addEventListener('message', (event: MessageEvent) => {
      this.emit('message', JSON.parse(event.data), event);
    });

    this.ws.addEventListener('error', error => {
      this.emit('error', error);
    });

    this.ws.addEventListener('close', () => {
      this.status = WebSocket.CLOSED;
      this.emit('close');
    });
  }

  public sendMessage = (message: any) => {
    this.ws.send(JSON.stringify(message));
  };
}

export const socketStore = new SocketStore();

export const useSocket = (onMessage: MessageHandler = noop, onError: ErrorHandler = noop): SocketStore => {
  const store = useObservable(socketStore);

  useEffect(() => {
    store.addListener('message', onMessage);
    store.addListener('error', onError);

    return () => {
      store.removeListener('message', onMessage);
      store.removeListener('error', onError);
    };
  }, [onMessage, onError]);

  return store;
};
