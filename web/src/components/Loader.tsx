import React from 'react';
import cx from 'classnames';
import classes from './Loader.mcss';

const Loader: React.SFC<Props> = ({ className, ...props }): React.ReactElement => (
  <div className={cx(classes.container, className)} {...props}>
    <div className={classes.ring} />
    <div className={classes.ring} />
    <div className={classes.ring} />
    <div className={classes.ring} />
  </div>
);

export type Props = React.HTMLAttributes<HTMLDivElement>;

export default Loader;
