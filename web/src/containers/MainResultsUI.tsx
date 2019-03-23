import React from 'react';
import { observer } from 'mobx-react-lite';
import cx from 'classnames';
import classes from './MainResultsUI.mcss';

const MainResultsUI: React.SFC<Props> = ({ className, ...props }): React.ReactElement => (
  <div className={cx(classes.container, className)} {...props}>
    <h2>결과</h2>
  </div>
);

export type Props = React.HTMLAttributes<HTMLDivElement>;

export default observer(MainResultsUI);
