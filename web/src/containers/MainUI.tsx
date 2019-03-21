import React from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import { observer, Observer } from 'mobx-react-lite';
import cx from 'classnames';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import datasets from '../domain/datasets';
import * as methods from '../domain/methods';
import reducers from '../domain/reducers';
import { useOptions } from '../stores/options';
import { useDataset } from '../stores/dataset';
import { useSocket } from '../stores/socket';
import { capitalize } from '../utils/misc';
import classes from './MainUI.mcss';

const MainUI = (): React.ReactElement => {
  const options = useOptions();
  const dataset = useDataset();

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

          <h3 className={classes.heading}>Misc.</h3>
          <Checkbox
            title="실시간 모드"
            value={options.realtime}
            onChange={value => {
              options.realtime = value;
            }}
            disabled
          />

          <Button
            className={classes.heading}
            primary
            disabled={!options.isSubmittable}
            onClick={() => {
              socket.sendAction('FETCH_DATASET', { name: options.dataset });
              socket.sendAction('APPLY_METHOD', options.toJSON());
            }}
          >
            확인
          </Button>
        </div>
        <div className={cx(classes.column, classes.middle)}>
          <canvas ref={canvasRef} className={classes.graphic} width={930} height={380} />
          <div className={classes.dataset}>
            <AutoSizer>
              {({ width, height }) => (
                <Observer>
                  {() => (
                    <Table
                      ref={tableRef}
                      width={width}
                      height={height}
                      headerHeight={20}
                      rowHeight={30}
                      rowCount={dataset.data.length}
                      rowGetter={({ index }) => dataset.data[index]}
                      rowStyle={({ index }) =>
                        index >= 0 && index < dataset.predictions.length
                          ? { backgroundColor: color(dataset.grounds[index], dataset.predictions[index]) }
                          : {}
                      }
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
    </React.Fragment>
  );
};

export default observer(MainUI);
