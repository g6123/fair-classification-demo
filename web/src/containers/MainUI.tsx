import React from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import { observer, Observer } from 'mobx-react-lite';
import cx from 'classnames';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import DebugPopup from '../components/DebugPopup';
import datasets from '../domain/datasets';
import * as methods from '../domain/methods';
import reducers from '../domain/reducers';
import { useOptions } from '../stores/options';
import { useDataset } from '../stores/dataset';
import { useDebug } from '../stores/debug';
import { useSocket } from '../stores/socket';
import { capitalize } from '../utils/misc';
import classes from './MainUI.mcss';

const MainUI = (): React.ReactElement => {
  const options = useOptions();
  const dataset = useDataset();
  const debug = useDebug();

  const socket = useSocket(message => {
    if (message.type === 'dataset') {
      dataset.columns = message.columns;
      dataset.data = message.data;
    }
  });

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={cx(classes.column, classes.left)}>
          <h3 className={classes.heading}>데이터셋</h3>
          <Select
            className={classes.select}
            items={datasets}
            value={options.dataset}
            onChange={value => {
              options.dataset = value;
            }}
          />

          <h3 className={classes.heading}>방법</h3>
          <Select
            className={classes.select}
            groups={methods.groups}
            items={methods.items}
            value={options.method}
            onChange={value => {
              options.method = value;
            }}
          />

          <h3>시각화</h3>
          <Select
            className={classes.dimension}
            items={reducers}
            value={options.reducer}
            onChange={value => {
              options.reducer = value;
            }}
          />

          <h3 className={classes.heading}>기타</h3>
          <ul className={classes.others}>
            <li className={classes.item}>
              <Checkbox
                title="실시간 모드"
                value={options.isRealtime}
                onChange={value => {
                  options.isRealtime = value;
                }}
                disabled
              />
            </li>
            <li className={classes.item}>
              <Checkbox
                title="디버그 모드"
                value={options.showDebug}
                onChange={value => {
                  options.showDebug = value;
                }}
              />
            </li>
          </ul>

          <Button
            className={classes.heading}
            primary
            disabled={!options.isSubmittable}
            onClick={() => {
              socket.sendMessage({ type: 'dataset', name: options.dataset });
            }}
          >
            확인
          </Button>
        </div>
        <div className={cx(classes.column, classes.middle)}>
          <canvas className={classes.graphic} />
          <div className={classes.dataset}>
            <AutoSizer>
              {({ width, height }) => (
                <Observer>
                  {() => (
                    <Table
                      width={width}
                      height={height}
                      headerHeight={20}
                      rowHeight={30}
                      rowCount={dataset.data.length}
                      rowGetter={({ index }) => dataset.data[index]}
                    >
                      {dataset.columns.map((column, index, { length }) => (
                        <Column
                          key={`column-${column}`}
                          width={width / length}
                          label={capitalize(column)}
                          dataKey={index.toString()}
                        />
                      ))}
                    </Table>
                  )}
                </Observer>
              )}
            </AutoSizer>
          </div>
        </div>
        <div className={cx(classes.column, classes.right)}>
          <h2>결과</h2>
        </div>
      </div>
      <DebugPopup
        className={classes.debug}
        logs={debug.logs.slice()}
        style={{ display: options.showDebug ? undefined : 'none' }}
      />
    </React.Fragment>
  );
};

export default observer(MainUI);
