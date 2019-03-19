import { useEffect, useState } from 'react';
import { noop } from '../utils/misc';

export type ErrorHandler = (error: Event) => void;
export type MessageHandler = (data: any, event: MessageEvent) => void;

const socket = new WebSocket(SERVER_URI);

const useEngine = (onMessage: MessageHandler = noop, onError: ErrorHandler = noop): number => {
  const [status, setStatus] = useState<number>(socket.readyState);

  const syncStatus = (): void => {
    setStatus(socket.readyState);
  };

  const handleMessage = (event: MessageEvent): void => {
    onMessage(event.data, event);
  };

  useEffect(() => {
    socket.addEventListener('open', syncStatus);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('error', onError);
    socket.addEventListener('close', syncStatus);

    return () => {
      socket.removeEventListener('open', syncStatus);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('error', onError);
      socket.removeEventListener('close', syncStatus);
    };
  });

  return status;
};

export default useEngine;
