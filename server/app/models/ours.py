from torch.nn import Linear, Module, ReLU
from torch.nn import functional as F

from app.models.classifier import Classifier
from app.models.vae import VAE


class Ours(Module):
    def __init__(self, dim_x, dim_h, dim_z):
        super(Ours, self).__init__()

        self.vae = VAE(dim_x, dim_h, dim_z)
        self.discriminator = Classifier()

    def forward(self, x, a):
        mean, log_var = self.vae.encode(x)
        z = self.vae.sample(mean, log_var)
        x_ = self.vae.decode(z)
        a_ = self.discriminator(mean)

        return x_, a_
