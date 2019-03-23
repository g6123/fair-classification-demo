export default [
  {
    id: 'adult',
    title: 'UCI Adult Data Set',
    protected: {
      column: 'sex',
      values: ['Female', 'Male'],
    },
  },
  {
    id: 'compas',
    title: 'COMPAS Recidivism Risk Score Data',
    protected: {
      column: 'race',
      values: ['Black', 'White'],
    },
    disabled: true,
  },
  {
    id: 'german',
    title: 'UCI German Dataset',
    protected: {
      column: 'sex',
      values: ['Female', 'Male'],
    },
    disabled: true,
  },
];

export interface Domain {
  id: string;
  title: string;
  protected: {
    column: string;
    values: string[];
  };
  disabled?: boolean;
}
