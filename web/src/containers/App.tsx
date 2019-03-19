import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from '../components/AppBar';
import Splash from '../components/Splash';
import useEngine from '../domain/engine';
import AppContent from './AppContent';

const App: React.SFC = (): React.ReactElement => {
  const status = useEngine();

  return (
  <React.Fragment>
      <Splash status={status} />
    <Router basename={__webpack_public_path__}>
      <React.Fragment>
        <AppBar>Fair Classification Demo</AppBar>
        <AppContent />
      </React.Fragment>
    </Router>
    <ToastContainer position="bottom-center" />
  </React.Fragment>
);

export default App;
