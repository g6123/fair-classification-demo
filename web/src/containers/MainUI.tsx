import React, { useState } from 'react';
import cx from 'classnames';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import DebugPopup from '../components/DebugPopup';
import datasets from '../domain/datasets';
import * as methods from '../domain/methods';
import reducers from '../domain/reducers';
import classes from './MainUI.mcss';

const MainUI: React.SFC = (): React.ReactElement | null => {
  const [file, setFile] = useState<string | null>(datasets[0].id);
  const [method, setMethod] = useState<string | null>(methods.items[0].id);
  const [reducer, setReducer] = useState<string | null>(reducers[0].id);
  const [realtime, setRealtime] = useState<boolean>(false);
  const [debug, setDebug] = useState<boolean>(false);

  return (
    <React.Fragment>
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
            onChange={value => setMethod(value)}
          />

          <h3>시각화 설정</h3>
          <Select
            className={classes.dimension}
            items={reducers}
            value={reducer}
            onChange={value => setReducer(value)}
          />

          <h3 className={classes.heading}>기타 설정</h3>
          <ul className={classes.others}>
            <li>
              <Checkbox title="실시간 모드" value={realtime} onChange={value => setRealtime(value)} />
            </li>
            <li>
              <Checkbox title="디버그 모드" value={debug} onChange={value => setDebug(value)} />
            </li>
          </ul>

          <Button className={classes.heading} primary disabled={file === null || method === null || reducer === null}>
            확인
          </Button>
        </div>
        <div className={cx(classes.column, classes.middle)}>
          <canvas />
          <h3 className={classes.heading}>데이터셋</h3>
        </div>
        <div className={cx(classes.column, classes.right)}>
          <h2>결과</h2>
        </div>
      </div>
      <DebugPopup className={classes.debug} style={{ display: debug ? undefined : 'none' }} />
    </React.Fragment>
  );
};

export default MainUI;
