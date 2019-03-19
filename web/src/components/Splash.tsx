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
    <div className={cx(classes.container, { [classes.hidden]: status === WebSocket.OPEN }, className)} {...props}>
      {status === WebSocket.CLOSED ? <LoaderError /> : <Loader />}
      <div className={classes.message}>
        {status === WebSocket.CLOSED ? '서버에 연결할 수 없습니다.' : '서버에 연결하는 중입니다.'}
      </div>
    </div>
  );
};

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  status: number;
}

export default Splash;
