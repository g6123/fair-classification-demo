import React from 'react';
// eslint-disable-next-line import/named
import { AutoSizer, Table, Column, defaultTableRowRenderer, TableRowRenderer } from 'react-virtualized';
import { Observer } from 'mobx-react-lite';
import { capitalize } from '../utils/misc';

const DatasetTable: React.SFC<Props> = ({
  columns = [],
  rows = [],
  rowRenderer = defaultTableRowRenderer,
  ...props
}): React.ReactElement => (
  <div {...props}>
    <AutoSizer>
      {({ width, height }) => (
        <Observer>
          {() => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={rows.length}
              rowGetter={({ index }) => rows[index]}
              rowRenderer={rowRenderer}
            >
              {columns.map((column, index, { length }) => (
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
);

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  rows?: any[];
  columns?: string[];
  rowRenderer?: TableRowRenderer;
}

export default DatasetTable;
