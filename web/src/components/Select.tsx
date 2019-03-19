import React from 'react';
import { noop, isVoid } from '../utils/misc';

const toValue = (stringValue: string): string | null => (stringValue === '' ? null : stringValue);
const toString = (value: string | null): string => (isVoid(value) ? '' : (value as string));

const Select: React.SFC<Props> = ({
  groups = [],
  items = [],
  value = null,
  onChange = noop,
  placeholder = null,
  ...props
}): React.ReactElement => (
  <select value={toString(value)} onChange={event => onChange(toValue(event.target.value), event)} {...props}>
    {value === null ? (
      <option value={toString(null)} disabled>
        {placeholder || '선택하세요.'}
      </option>
    ) : null}
    {[{ id: null, title: '미분류' }, ...groups].map(group =>
      group.id === null ? (
        <React.Fragment key={`group-${group.id}`}>
          {items
            .filter(item => isVoid(item.group))
            .map(item => (
              <option key={item.id} value={item.id} disabled={item.disabled}>
                {item.title}
              </option>
            ))}
        </React.Fragment>
      ) : (
        <optgroup key={`group-${group.id}`} label={group.title}>
          {items
            .filter(item => item.group === group.id)
            .map(item => (
              <option key={item.id} value={item.id} disabled={item.disabled}>
                {item.title}
              </option>
            ))}
        </optgroup>
      ),
    )}
  </select>
);

export interface Props extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  groups?: { id: string; title: string }[];
  items?: { id: string; title: string; group?: string; disabled?: boolean }[];
  value?: string | null;
  placeholder?: string;
  onChange?: (value: string | null, event: React.ChangeEvent) => void;
}

export default Select;
