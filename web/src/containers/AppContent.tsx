import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainUI from './MainUI';
import NotFoundUI from './NotFoundUI';

const AppContent: React.SFC = (): React.ReactElement => (
  <Switch>
    <Route exact path="/" component={MainUI} />
    <Route component={NotFoundUI} />
  </Switch>
);

export default AppContent;
