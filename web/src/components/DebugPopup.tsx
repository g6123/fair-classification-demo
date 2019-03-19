import React from 'react';
import cx from 'classnames';
import classes from './DebugPopup.mcss';

const DebugPopup: React.SFC<Props> = ({ className, content, ...props }): React.ReactElement => (
  <div className={cx(classes.container, className)} {...props}>
    <h2 className={classes.heading}>Debug Log</h2>
    <pre className={classes.content}>
      <code>{content}</code>
    </pre>
  </div>
);

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content?: string | null;
}

export default DebugPopup;
