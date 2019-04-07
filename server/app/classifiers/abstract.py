class AbstractClassifier(object):
    def __init__(self, train_dataset, test_dataset):
        self.train_dataset = train_dataset
        self.test_dataset = test_dataset

    @property
    def epochs(self):
        raise NotImplementedError

    def fit(self):
        raise NotImplementedError

    def predict(self):
        raise NotImplementedError
