import React from 'react';
import cx from 'classnames';
import classes from './AppBar.mcss';

const AppBar: React.SFC<Props> = ({ className, children, ...props }): React.ReactElement => (
  <div className={cx(classes.container, className)} {...props}>
    <div className={classes.wrapper}>
      <span className={classes.title}>{children}</span>
    </div>
  </div>
);

export type Props = React.HTMLAttributes<HTMLDivElement>;

export default AppBar;
