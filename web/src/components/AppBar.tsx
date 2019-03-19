import React from 'react';
import cx from 'classnames';
import classes from './AppBar.mcss';

const AppBar: React.SFC<Props> = ({ className, children, ...props }): React.ReactElement => (
  <div className={cx(classes.container, className)} {...props}>
    <h1 className={cx(classes.wrapper, classes.title)}>{children}</h1>
  </div>
);

export type Props = React.HTMLAttributes<HTMLDivElement>;

export default AppBar;
