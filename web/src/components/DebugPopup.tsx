import React from 'react';
import cx from 'classnames';
import { Log } from '../stores/debug';
import { reverse } from '../utils/misc';
import classes from './DebugPopup.mcss';

const DebugPopup: React.SFC<Props> = ({ className, logs = [], ...props }): React.ReactElement => (
  <div className={cx(classes.container, className)} {...props}>
    <h2 className={classes.heading}>Debug Log</h2>
    <div className={classes.content}>
      {reverse(logs)
        .slice(0, 10)
        .map(({ id, date, level, content }) => (
          <p key={`log-${id}`}>{`[${new Date(date).toLocaleTimeString()}] [${level.toUpperCase()}] ${content}`}</p>
        ))}
    </div>
  </div>
);

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  logs?: Log[];
}

export default DebugPopup;
