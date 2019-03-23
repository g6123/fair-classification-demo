import { classifier, training } from './method-options';

export const groups = [
  {
    id: 'pre',
    title: 'Pre-processing',
  },
  {
    id: 'in',
    title: 'In-processing',
  },
  {
    id: 'post',
    title: 'Post-processing',
  },
];

export const items = [
  {
    id: 'none',
    title: 'None',
    options: [
      {
        id: 'classifier',
        schema: classifier,
        defaultValue: { type: 'nn' },
      },
      {
        id: 'training',
        schema: training,
        defaultValue: { epochs: 100, batchSize: 2048 },
      },
    ],
  },
  {
    id: 'calmon',
    group: 'pre',
    title: 'Optimized Pre-processing',
    options: [{ id: 'classifier', schema: classifier }],
    disabled: true,
  },
  // {
  //   id: 'feldman',
  //   group: 'pre',
  //   title: 'Disparate Impact Remover',
  //   options: [{ id: 'classifier', schema: classifier }],
  // },
  {
    id: 'kamiran',
    group: 'pre',
    title: 'Reweighing',
    options: [{ id: 'classifier', schema: classifier }],
    disabled: true,
  },
  {
    id: 'zemel',
    group: 'pre',
    title: 'Learning Fair Representation',
    options: [{ id: 'classifier', schema: classifier }],
    disabled: true,
  },
  {
    id: 'ours',
    group: 'pre',
    title: 'Fair Representation via Adversarial Learning',
  },
  {
    id: 'zhang',
    group: 'in',
    title: 'Adversarial Debiasing',
    disabled: true,
  },
  {
    id: 'kamishima',
    group: 'in',
    title: 'Prejudice Remover',
    disabled: true,
  },
  // {
  //   id: 'celis',
  //   title: 'Meta Fair Classifier',
  //   group: 'in',
  // },
  {
    id: 'kamiran',
    group: 'post',
    title: 'Reject Option Classifier',
    disabled: true,
  },
  {
    id: 'hardt',
    group: 'post',
    title: 'Equalized Odds Post-processing',
    disabled: true,
  },
  // {
  //   id: 'pleiss',
  //   title: 'Calibrated Equalized Odds Post-processing',
  //   group: 'post',
  // },
];
