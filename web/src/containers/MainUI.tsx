import React from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import cx from 'classnames';
import ProgressBar from '../components/ProgressBar';
import { useOptions } from '../stores/options';
import { useDataset } from '../stores/dataset';
import { useSocket } from '../stores/socket';
import MainOptionsUI from './MainOptionsUI';
import MainOutputUI from './MainOutputUI';
import MainReportUI from './MainReportUI';
import classes from './MainUI.mcss';

const MainUI = (): React.ReactElement => {
  const options = useOptions();
  const dataset = useDataset();

  const socket = useSocket(action => {
    switch (action.type) {
      case 'SET_DATASET': {
        dataset.columns = action.columns;
        dataset.data = action.data;
        break;
      }

      case 'SET_POINTS': {
        dataset.grounds = action.grounds;
        dataset.predictions = action.predictions;
        dataset.positions = action.positions;
        dataset.reports = action.reports;
        dataset.progress = action.epoch;
        break;
      }

      case 'SET_ERROR': {
        toast(action.message, { type: 'error' });
        break;
      }
    }
  });

  return (
    <React.Fragment>
      <div className={classes.container}>
        <MainOptionsUI
          className={cx(classes.column, classes.left)}
          onSubmit={() => {
            socket.sendAction('FETCH_DATASET', { name: options.dataset });
            socket.sendAction('APPLY_METHOD', options.toJSON());
          }}
        />
        <MainOutputUI className={cx(classes.column, classes.middle)} />
        <MainReportUI className={cx(classes.column, classes.right)} />
      </div>
      <ProgressBar className={classes.progress} value={dataset.progress[0]} max={dataset.progress[1]} />
    </React.Fragment>
  );
};

export default observer(MainUI);
