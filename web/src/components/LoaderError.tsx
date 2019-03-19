import React from 'react';
import cx from 'classnames';
import classes from './LoaderError.mcss';

const LoaderError: React.SFC<Props> = ({ className, ...props }): React.ReactElement => (
  <i className={cx(classes.container, className)} {...props} />
);

export type Props = React.HTMLAttributes<HTMLDivElement>;

export default LoaderError;
