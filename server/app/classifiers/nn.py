import torch
from torch.utils.data import DataLoader

from app.classifiers.abstract import AbstractClassifier
from app.datasets.reshape import ReshapeDataset
from app.models.classifier import Classifier

device = torch.device('cuda')


class NeuralNetwork(AbstractClassifier):
    def __init__(self, train_dataset, test_dataset, **kwargs):
        self._model = Classifier().to(device)
        self._optimizer = torch.optim.Adam(self._model.parameters(), lr=0.001)
        self._compute_loss = torch.nn.NLLLoss().to(device)

        self._epochs = kwargs.pop('epochs', 100)
        self._batch_size = kwargs.pop('batchSize', 2048)

        super(NeuralNetwork, self).__init__(train_dataset, test_dataset, **kwargs)

    @property
    def epochs(self):
        return self._epochs

    def fit(self):
        loader = DataLoader(ReshapeDataset(self.train_dataset, (1, 11, 10)), batch_size=self._batch_size, shuffle=True)

        for epoch in range(self._epochs):
            self._model.train()

            for input, target in loader:
                self._optimizer.zero_grad()

                input = input.to(device).float()
                target = target.to(device)
                output = self._model(input)

                loss = self._compute_loss(output, target)

                loss.backward()
                self._optimizer.step()

            yield epoch

    def predict(self):
        loader = DataLoader(ReshapeDataset(self.test_dataset, (1, 11, 10)), batch_size=len(self.test_dataset))

        with torch.no_grad():
            self._model.eval()

            x, _ = next(iter(loader))
            x = x.to(device).float()

            y_ = self._model(x).exp()
            y_ = y_.cpu().numpy()

        return y_
