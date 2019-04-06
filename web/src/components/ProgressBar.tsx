import React from 'react';
import cx from 'classnames';
import { percent } from '../utils/math';
import classes from './ProgressBar.mcss';

const ProgressBar: React.SFC<Props> = ({ value = 0, max = 0, message, className }): React.ReactElement => {
  const ratio = isNaN(value / max) ? 0 : value / max;

  return (
    <div className={cx(classes.container, className)}>
      <progress className={classes.bar} value={value} max={max} />
      <div className={classes.text}>
        <span className={classes.message}>{message}</span>
        <span className={classes.numbers}>
          {percent(ratio)}% ({value}/{max})
        </span>
      </div>
    </div>
  );
};

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  message?: string;
}

export default ProgressBar;
