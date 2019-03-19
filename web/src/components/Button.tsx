import React from 'react';
import cx from 'classnames';
import classes from './Button.mcss';

const Button: React.SFC<Props> = ({ primary = false, className, ...props }): React.ReactElement => (
  <button className={cx(classes.button, { [classes.primary]: primary }, className)} {...props} />
);

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

export default Button;
