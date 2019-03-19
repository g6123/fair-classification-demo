import React from 'react';
import { noop } from '../utils/misc';

const Checkbox: React.SFC<Props> = ({ title = null, value = false, onChange = noop, ...props }): React.ReactElement => (
  <label>
    <input type="checkbox" checked={value} onChange={event => onChange(event.target.checked, event)} {...props} />{' '}
    {title}
  </label>
);

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'title' | 'value' | 'onChange'> {
  title?: string | null;
  value?: boolean;
  onChange?: (value: boolean, event: React.ChangeEvent) => void;
}

export default Checkbox;
