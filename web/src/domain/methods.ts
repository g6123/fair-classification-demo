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
    id: 'calmon',
    title: 'Optimized Pre-processing',
    disabled: true,
    group: 'pre',
  },
  // {
  //   id: 'feldman',
  //   title: 'Disparate Impact Remover',
  //   group: 'pre',
  // },
  {
    id: 'kamiran',
    title: 'Reweighing',
    disabled: true,
    group: 'pre',
  },
  {
    id: 'zemel',
    title: 'Learning Fair Representation',
    disabled: true,
    group: 'pre',
  },
  {
    id: 'ours',
    title: 'Fair Representation via Adversarial Learning',
    group: 'pre',
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
