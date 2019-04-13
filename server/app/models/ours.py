from torch.nn import Linear, Module, ReLU, Sequential, LogSoftmax
from torch.nn import functional as F

from app.models.classifier import Classifier
from app.models.vae import VAE


class Ours(Module):
    def __init__(self, dim_x=108, dim_h=128, dim_z=2):
        super(Ours, self).__init__()

        self.vae = VAE(dim_x, dim_h, dim_z)

        self.discriminator = Sequential(
            Linear(dim_z, 16),
            ReLU(),
            Linear(16, 16),
            ReLU(),
            Linear(16, 16),
            ReLU(),
            Linear(16, 2),
            LogSoftmax(dim=1),
        )

    def forward(self, x):
        mean, log_var = self.vae.encode(x)
        z = self.vae.sample(mean, log_var)
        x_ = self.vae.decode(z)
        a_ = self.discriminator(mean)

        return x_, mean, log_var, a_
