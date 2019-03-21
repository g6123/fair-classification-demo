import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import AppBar from '../components/AppBar';
import Splash from '../components/Splash';
import { useSocket } from '../stores/socket';
import { useDebug } from '../stores/debug';
import AppContent from './AppContent';
import AppRouter from './AppRouter';

const App: React.SFC = (): React.ReactElement => {
  const socket = useSocket();
  const debug = useDebug();

  useEffect(() => {
    const openHandler = (): void => {
      debug.log('info', `Socket connected to ${socket.ws.url}`);
    };

    const messageHandler = (message: any): void => {
      debug.log('debug', `Socket received a message: ${JSON.stringify(message, undefined, 2)}`);
    };

    socket.addListener('open', openHandler);
    socket.addListener('message', messageHandler);

    return () => {
      socket.removeListener('open', openHandler);
      socket.removeListener('message', messageHandler);
    };
  });

  return (
    <React.Fragment>
      <AppRouter>
        <AppBar>Fair Classification Demo</AppBar>
        {socket.status === WebSocket.OPEN ? <AppContent /> : <Splash status={socket.status} />}
      </AppRouter>
      <ToastContainer position="bottom-center" />
    </React.Fragment>
  );
};

export default observer(App);
