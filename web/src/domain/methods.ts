import { classifier } from './method-options';

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
    options: [{ id: 'classifier', schema: classifier }],
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
    options: [{ id: 'classifier', schema: classifier }],
  },
  {
    id: 'zhang',
    title: 'Adversarial Debiasing',
    group: 'in',
  },
  {
    id: 'kamishima',
    title: 'Prejudice Remover',
    disabled: true,
    group: 'in',
  },
  // {
  //   id: 'celis',
  //   title: 'Meta Fair Classifier',
  //   group: 'in',
  // },
  {
    id: 'kamiran',
    title: 'Reject Option Classifier',
    disabled: true,
    group: 'post',
  },
  {
    id: 'hardt',
    title: 'Equalized Odds Post-processing',
    group: 'post',
  },
  // {
  //   id: 'pleiss',
  //   title: 'Calibrated Equalized Odds Post-processing',
  //   group: 'post',
  // },
];
