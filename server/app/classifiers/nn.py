import torch
from torch.utils.data import DataLoader

from app.classifiers.abstract import AbstractClassifier
from app.datasets.reshape import ReshapeDataset
from app.models.classifier import Classifier

device = torch.device('cuda')


class NeuralNetwork(AbstractClassifier):
    def __init__(self, train_dataset, test_dataset, epochs=100, **kwargs):
        super(NeuralNetwork, self).__init__(train_dataset, test_dataset)

        self.model = Classifier().to(device)
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=0.001)
        self.compute_loss = torch.nn.NLLLoss().to(device)

        self._epochs = epochs

    @property
    def epochs(self):
        return self._epochs

    def fit(self):
        loader = DataLoader(ReshapeDataset(self.train_dataset, (1, 11, 10)), batch_size=2048, shuffle=True)

        for epoch in range(self.epochs):
            self.model.train()

            for input, target in loader:
                self.optimizer.zero_grad()

                input = input.to(device).float()
                target = target.to(device)
                output = self.model(input)

                loss = self.compute_loss(output, target)

                loss.backward()
                self.optimizer.step()

            yield epoch

    def predict(self):
        loader = DataLoader(ReshapeDataset(self.test_dataset, (1, 11, 10)), batch_size=len(self.test_dataset))

        with torch.no_grad():
            self.model.eval()

            x, _ = next(iter(loader))
            x = x.to(device).float()
            y_ = self.model(x)

            return {
                'positions': y_.exp().cpu().tolist(),
                'predictions': y_.argmax(dim=1).cpu().tolist(),
            }
