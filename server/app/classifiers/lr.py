import numpy as np
from sklearn.linear_model import LinearRegression as BaseLinearRegression

from app.classifiers.abstract import AbstractClassifier


class LinearRegression(AbstractClassifier):
    def __init__(self, train_dataset, test_dataset, **kwargs):
        super(LinearRegression, self).__init__(train_dataset, test_dataset)

        self.lr = BaseLinearRegression()

    @property
    def epochs(self):
        return 1

    def fit(self):
        self.lr.fit(self.train_dataset.x, self.train_dataset.y)
        yield 1

    def predict(self):
        y_ = self.lr.predict(self.test_dataset.x)
        y_ = np.stack((y_, y_ * -1), axis=-1)
        y_ = (y_ + 1) / 2

        return {
            'positions': y_.tolist(),
            'predictions': np.argmax(y_, axis=1).tolist(),
        }
