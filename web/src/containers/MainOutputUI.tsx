import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { defaultTableRowRenderer } from 'react-virtualized';
import cx from 'classnames';
import Select from '../components/Select';
import DatasetCanvas, { Ref as DatasetCanvasRef } from '../components/DatasetCanvas';
import DatasetTable from '../components/DatasetTable';
import { useOptions } from '../stores/options';
import { useDataset } from '../stores/dataset';
import datasets from '../domain/datasets';
import { get as getColor, TRANSPARENT as COLOR_TRANSPARENT } from '../domain/colors';
import { get } from '../utils/misc';
import classes from './MainOutputUI.mcss';

const ALL = '@@ALL';

const MainOutputUI: React.SFC<Props> = ({ className, ...props }): React.ReactElement => {
  const [filters, setFilters] = useState<State>({ group: ALL, ground: ALL, prediction: ALL });
  const canvas = useRef<DatasetCanvasRef>(null);
  const options = useOptions();
  const dataset = useDataset();

  const datasetDomain = datasets.find(({ id }) => id === options.dataset);
  const groupColumn = dataset.columns.findIndex(col => col === get(datasetDomain, 'protected.column', null));

  useEffect(() => {
    if (canvas.current !== null) {
      canvas.current.draw(dataset.positions, 3, i => {
        if (filters.group !== ALL && dataset.data[i][groupColumn] !== filters.group) {
          return COLOR_TRANSPARENT;
        }

        if (filters.ground !== ALL && dataset.grounds[i] !== +filters.ground) {
          return COLOR_TRANSPARENT;
        }

        if (filters.prediction !== ALL && dataset.predictions[i] !== +filters.prediction) {
          return COLOR_TRANSPARENT;
        }

        return getColor(dataset.grounds[i], dataset.predictions[i]);
      });
    }

    return () => {
      if (canvas.current !== null) {
        canvas.current.clear();
      }
    };
  }, [filters, canvas, dataset.grounds, dataset.predictions, dataset.positions]);

  return (
    <div className={cx(classes.container, className)} {...props}>
      <div className={classes.filters}>
        <h2 className={classes.title}>Filters</h2>
        <h3 className={classes.label}>Group</h3>
        <Select
          className={classes.select}
          values={[
            { id: ALL, title: 'All' },
            ...get<string[]>(datasetDomain, 'protected.values', []).map(value => ({ id: value, title: value })),
          ]}
          value={filters.group}
          onChange={value => setFilters({ ...filters, group: value || ALL })}
        />
        <h3 className={classes.label}>Ground Truth</h3>
        <Select
          className={classes.select}
          values={[{ id: ALL, title: 'All' }, { id: 1, title: 'Positive' }, { id: 0, title: 'Negative' }]}
          value={filters.ground}
          onChange={value => setFilters({ ...filters, ground: value || ALL })}
        />
        <h3 className={classes.label}>Predicition</h3>
        <Select
          className={classes.select}
          values={[{ id: ALL, title: 'All' }, { id: 1, title: 'Positive' }, { id: 0, title: 'Negative' }]}
          value={filters.prediction}
          onChange={value => setFilters({ ...filters, prediction: value || ALL })}
        />
      </div>

      <h2 className={classes.title}>Visualization Canvas</h2>
      <DatasetCanvas ref={canvas} width={930} height={500} />

      <h2 className={classes.title}>Dataset Table</h2>
      <DatasetTable
        className={classes.dataset}
        columns={dataset.columns}
        rows={dataset.data}
        rowRenderer={props => {
          const { index, style } = props;

          if (index >= 0 && index < dataset.predictions.length) {
            style.backgroundColor = getColor(dataset.grounds[index], dataset.predictions[index]);
          }

          return React.cloneElement(defaultTableRowRenderer(props) as React.ReactElement, { style });
        }}
      />
    </div>
  );
};

export type Props = React.HTMLAttributes<HTMLDivElement>;

interface State {
  group: string;
  ground: string;
  prediction: string;
}

export default observer(MainOutputUI);
