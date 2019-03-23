export const classifier = {
  title: 'Classifier',
  type: 'object',
  properties: {
    type: {
      title: 'Type',
      type: 'string',
      enum: ['nn', 'lr'],
      enumNames: ['Neural Network', 'Linear Regression'],
    },
  },
};

export const training = {
  title: 'Training',
  type: 'object',
  properties: {
    epochs: {
      title: 'Epochs',
      type: 'number',
    },
    batchSize: {
      title: 'Batch Size',
      type: 'number',
    },
  },
};
