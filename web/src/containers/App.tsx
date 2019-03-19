import React from 'react';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import AppBar from '../components/AppBar';
import Splash from '../components/Splash';
import { useSocket } from '../stores/socket';
import AppContent from './AppContent';
import AppRouter from './AppRouter';

const App: React.SFC = (): React.ReactElement => {
  const socket = useSocket();

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
