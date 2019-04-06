import React from 'react';
import SchemaForm from 'react-jsonschema-form';
import { observer } from 'mobx-react-lite';
import cx from 'classnames';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import datasets from '../domain/datasets';
import * as methods from '../domain/methods';
import visualizers from '../domain/visualizers';
import { useOptions } from '../stores/options';
import { noop } from '../utils/misc';
import classes from './MainOptionsUI.mcss';

const MainOptionsUI: React.SFC<Props> = ({ className, onSubmit = noop, ...props }): React.ReactElement => {
  const options = useOptions();

  return (
    <div className={cx(classes.container, className)} {...props}>
      <h3 className={classes.heading}>Dataset</h3>
      <Select
        className={classes.select}
        values={datasets}
        value={options.dataset}
        onChange={value => {
          options.dataset = value;
        }}
      />

      <h3 className={classes.heading}>Bias Mitigation Method</h3>
      <Select
        className={classes.select}
        groups={methods.groups}
        values={methods.items}
        value={options.method.type}
        onChange={value => {
          options.setMethodType(value);
        }}
      />

      {methods.items
        .filter(({ id }) => id === options.method.type)
        .flatMap(item => item.options || [])
        .map(({ id, schema }) => (
          <SchemaForm
            className={classes.schemaForm}
            key={id}
            schema={schema}
            formData={options.method[id]}
            onChange={({ formData }) => {
              options.method[id] = formData;
            }}
          >
            {true}
          </SchemaForm>
        ))}

      <h3 className={classes.heading}>Visualization</h3>
      <Select
        className={cx(classes.select, classes.dimension)}
        values={visualizers}
        value={options.visualizer}
        onChange={value => {
          options.visualizer = value;
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

      <Button className={classes.heading} primary disabled={!options.isSubmittable} onClick={onSubmit}>
        확인
      </Button>
    </div>
  );
};

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
}

export default observer(MainOptionsUI);
