import React from 'react';
import { Router, RouterProps } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import { routerStore } from '../stores/router';

const history = syncHistoryWithStore(
  createBrowserHistory({
    basename: __webpack_public_path__,
  }),
  routerStore,
);

const AppRouter: React.SFC<Props> = ({ children, ...props }): React.ReactElement => (
  <Router history={history} {...props}>
    {React.Children.count(children) > 1 ? <React.Fragment>{children}</React.Fragment> : children}
  </Router>
);

export type Props = Omit<RouterProps, 'history'>;

export default AppRouter;
