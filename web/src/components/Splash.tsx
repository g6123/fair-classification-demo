import React, { useEffect } from 'react';
import cx from 'classnames';
import Loader from './Loader';
import LoaderError from './LoaderError';
import classes from './Splash.mcss';

const Splash: React.SFC<Props> = ({ status, className, ...props }): React.ReactElement => {
  useEffect(() => {
    if (status !== WebSocket.OPEN) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = null;
    };
  }, [status]);

  return (
    <div className={cx(classes.container, className)} {...props}>
      {status === WebSocket.CLOSED ? (
        <React.Fragment>
          <LoaderError />
          <div className={classes.message}>서버에 연결할 수 없습니다.</div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Loader />
          <div className={classes.message}>서버에 연결하는 중입니다.</div>
        </React.Fragment>
      )}
    </div>
  );
};

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  status: number;
}

export default Splash;
