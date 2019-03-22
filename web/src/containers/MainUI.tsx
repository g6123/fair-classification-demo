import React, { useRef } from 'react';
import SchemaForm from 'react-jsonschema-form';
import { AutoSizer, Table, Column } from 'react-virtualized';
import { observer, Observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
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

const color = (y: number, y_: number): string => {
  if (y && y_) {
    return '#00c4dd';
  } else if (y && !y_) {
    return '#c9f9ff';
  } else if (!y && y_) {
    return '#ffcfc9';
  } else if (!y && !y_) {
    return '#dd1900';
  } else {
    return '';
  }
};

const MainUI = (): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tableRef = useRef<Table>(null);

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
        dataset.predictions = action.predictions;
        dataset.grounds = action.grounds;

        if (action.epoch) {
          dataset.progress = action.epoch;
        }

        if (tableRef.current !== null) {
          tableRef.current.forceUpdateGrid();
        }

        if (canvasRef.current !== null) {
          const node = canvasRef.current;
          const context = node.getContext('2d') as CanvasRenderingContext2D;

          context.clearRect(0, 0, node.width, node.height);

          for (let i = 0; i < action.predictions.length; i++) {
            const y = action.grounds[i];
            const y_ = action.predictions[i];
            const ps = action.positions[i];

            context.fillStyle = color(y, y_);
            context.fillRect(ps[0] * node.width, (1 - ps[1]) * node.height, 3, 3);
          }
        }

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
        <div className={cx(classes.column, classes.left)}>
          <h3 className={classes.heading}>Dataset</h3>
          <Select
            className={classes.select}
            items={datasets}
            value={options.dataset}
            onChange={value => {
              options.dataset = value;
            }}
          />

          <h3 className={classes.heading}>Bias Mitigation Method</h3>
          <Select
            className={classes.select}
            groups={methods.groups}
            items={methods.items}
            value={options.method.type}
            onChange={value => {
              options.method.type = value;
            }}
          />

          {methods.items
            .filter(({ id: methodType }) => methodType === options.method.type)
            .map(({ options: methodSchema = [] }) =>
              methodSchema.map(({ id: schemaId, schema }) => (
                <SchemaForm
                  className={classes.methodOptions}
                  key={schemaId}
                  schema={schema as any}
                  formData={options.method[schemaId]}
                  onChange={({ formData }) => {
                    options.method[schemaId] = formData;
                  }}
                >
                  {true}
                </SchemaForm>
              )),
            )}

          <h3 className={classes.heading}>Visualization</h3>
          <Select
            className={cx(classes.select, classes.dimension)}
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
      <progress className={classes.progress} value={dataset.progress[0]} max={dataset.progress[1]} />
    </React.Fragment>
  );
};

export default observer(MainUI);
