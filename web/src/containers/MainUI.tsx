import React, { useState } from 'react';
import cx from 'classnames';
import Select from '../components/Select';
import Button from '../components/Button';
import datasets from '../domain/datasets';
import * as methods from '../domain/methods';
import classes from './MainUI.mcss';

const MainUI: React.SFC = (): React.ReactElement | null => {
  const [file, setFile] = useState<string | null>(null);
  const [method, setMethod] = useState<string | null>(null);

  return (
    <div className={classes.container}>
      <div className={cx(classes.column, classes.left)}>
        <h3 className={classes.heading}>데이터셋 선택</h3>
        <Select className={classes.select} items={datasets} value={file} onChange={value => setFile(value)} />

        <h3 className={classes.heading}>방법 선택</h3>
        <Select
          className={classes.select}
          groups={methods.groups}
          items={methods.items}
          value={method}
          disabled={file === null}
          onChange={value => setMethod(value)}
        />

        <Button className={classes.heading} primary disabled={file === null || method === null}>
          확인
        </Button>
      </div>
      <div className={cx(classes.column, classes.middle)}>
        <div>
          <h3>시각화 옵션</h3>
        </div>
        <canvas />
        <div>
          <h3>데이터셋</h3>
        </div>
      </div>
      <div className={cx(classes.column, classes.right)}>
        <h2>결과</h2>
      </div>
    </div>
  );
};

export default MainUI;
