import React from 'react';
import { Pie } from '@nivo/pie';
import { Bar } from '@nivo/bar';
import { observer } from 'mobx-react-lite';
import cx from 'classnames';
import { useDataset } from '../stores/dataset';
import { rgba, COLOR_TP, COLOR_FN, COLOR_FP, COLOR_TN, COLOR_NONE } from '../domain/colors';
import { percent, cmSum, sum } from '../utils/math';
import classes from './MainReportUI.mcss';

const colorBy = (props: any): string => {
  switch (props.id) {
    case 'True Positive':
      return rgba(COLOR_TP);

    case 'False Negative':
      return rgba(COLOR_FN);

    case 'False Positive':
      return rgba(COLOR_FP);

    case 'True Negative':
      return rgba(COLOR_TN);

    default:
      return rgba(COLOR_NONE);
  }
};

const MainReportUI: React.SFC<Props> = ({ className, ...props }): React.ReactElement => {
  const dataset = useDataset();

  return (
    <div className={cx(classes.container, className)} {...props}>
      <h2 className={classes.title}>Protected Attribute</h2>
      <Pie
        width={100}
        height={100}
        animate={false}
        data={Object.entries(dataset.reports).map(([label, cm]) => ({
          id: label.toLowerCase(),
          label,
          value: cmSum(cm),
        }))}
      />

      <h2 className={classes.title}>Target Attribute</h2>
      <Bar
        width={100}
        height={100}
        animate={false}
        data={[
          {
            label: 'Ground Truth',
            Positive: sum(Object.values(dataset.reports).map(cm => cmSum(cm, [[1, 0], [1, 1]]))),
            Negative: sum(Object.values(dataset.reports).map(cm => cmSum(cm, [[0, 0], [0, 1]]))),
          },
          {
            label: 'Prediction',
            Positive: sum(Object.values(dataset.reports).map(cm => cmSum(cm, [[0, 1], [1, 1]]))),
            Negative: sum(Object.values(dataset.reports).map(cm => cmSum(cm, [[0, 0], [1, 0]]))),
          },
        ]}
        indexBy="label"
        keys={['Positive', 'Negative']}
        colorBy={({ id }) => (id === 'Positive' ? rgba(COLOR_TP) : id === 'Negative' ? rgba(COLOR_TN) : '')}
      />

      <h2 className={classes.title}>Prediction by Protected Attribute</h2>
      <Bar
        width={100}
        height={100}
        animate={false}
        data={Object.entries(dataset.reports).map(([label, cm]) => ({
          label,
          'True Positive': percent(cm[1][1] / cmSum(cm)),
          'False Positive': percent(cm[0][1] / cmSum(cm)),
          'True Negative': percent(cm[0][0] / cmSum(cm)),
          'False Negative': percent(cm[1][0] / cmSum(cm)),
        }))}
        indexBy="label"
        keys={['True Positive', 'False Positive', 'True Negative', 'False Negative']}
        colorBy={colorBy}
      />

      <h2 className={classes.title}>True Positive Rate</h2>
      <Bar
        width={100}
        height={100}
        animate={false}
        data={Object.entries(dataset.reports).map(([label, cm]) => ({
          label,
          'True Positive': percent(cm[1][1] / cmSum(cm, [[1, 0], [1, 1]])),
          'False Negative': percent(cm[1][0] / cmSum(cm, [[1, 0], [1, 1]])),
        }))}
        indexBy="label"
        keys={['True Positive', 'False Negative']}
        colorBy={colorBy}
      />

      <h2 className={classes.title}>False Positive Rate</h2>
      <Bar
        width={100}
        height={100}
        animate={false}
        data={Object.entries(dataset.reports).map(([label, cm]) => ({
          label,
          'False Positive': percent(cm[0][1] / cmSum(cm, [[0, 1], [0, 0]])),
          'True Negative': percent(cm[0][0] / cmSum(cm, [[0, 1], [0, 0]])),
        }))}
        indexBy="label"
        keys={['False Positive', 'True Negative']}
        colorBy={colorBy}
      />
    </div>
  );
};

export type Props = React.HTMLAttributes<HTMLDivElement>;

export default observer(MainReportUI);
