import numpy as np
import torch
from torch.utils.data import DataLoader

from app import settings
from app import actions
from app.classifiers import classifiers
from app.models.ours import Ours
from app.utils import scale, get

device = torch.device(settings.DEVICE)


def run(train_dataset, test_dataset, visualizer, action):
    epochs = get(action, ('method', 'training', 'epochs'), 100)
    batch_size = get(action, ('method', 'training', 'batchSize'), 2048)
    reg_weight = get(action, ('method', 'training', 'reg'), 0.0005)
    adv_weight = get(action, ('method', 'training', 'adv'), 0.02)
    classifier_type = get(action, ('method', 'classifier', 'type'))

    if classifier_type not in classifiers:
        yield actions.set_error("Unkown classifier type")
        return

    Classifier = classifiers[classifier_type]
    classifier = Classifier(train_dataset, test_dataset)

    model = Ours(108, 128, 2).to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

    compute_reconstruction_loss = torch.nn.MSELoss().to(device)
    compute_discrimination_loss = torch.nn.CrossEntropyLoss().to(device)

    def compute_regularization_loss(mu, logvar):
        return -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())

    for epoch in range(epochs):
        model.train()

        for x, y, a in loader:
            optimizer.zero_grad()

            x = x.to(device).float()
            a = a.to(device)

            x_, mean, log_var, a_ = model(x)

            loss = compute_reconstruction_loss(x_, x) * (1 - reg_weight)
            loss.add_(compute_regularization_loss(mean, log_var).to(device) * reg_weight)
            loss.mul_(1 - adv_weight)
            loss.add_(compute_discrimination_loss(a_, a) * adv_weight)

            loss.backward()
            optimizer.step()

        _, z, _, _ = model(x)
        z = z.detach().cpu().numpy()
        z = scale(z)

        yield actions.set_points(test_dataset.y, test_dataset.y, z, test_dataset.locs)
        yield actions.set_progress(epoch, epochs, "Pre-processing...")

    epochs = classifier.epochs

    for epoch in classifier.fit():
        y_ = classifier.predict()

        y = test_dataset.y
        y_ = np.argmax(y_, axis=1)

        yield actions.set_points(y, y_, z, test_dataset.locs)
        yield actions.set_progress(epoch, epochs, "Classifying...")

    yield actions.set_progress(epochs, epochs, "Done")
