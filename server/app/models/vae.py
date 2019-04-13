import torch
from torch.nn import Linear, Module, ReLU
from torch.nn import functional as F


class VAE(Module):
    def __init__(self, dim_x, dim_h, dim_z):
        super(VAE, self).__init__()

        self.dense1 = Linear(dim_x, dim_h)
        self.dense2 = Linear(dim_h, dim_h)
        self.dense3_1 = Linear(dim_h, dim_z)
        self.dense3_2 = Linear(dim_h, dim_z)
        self.dense4 = Linear(dim_z, dim_h)
        self.dense5 = Linear(dim_h, dim_h)
        self.dense6 = Linear(dim_h, dim_x)

    def encode(self, x):
        x = self.dense1(x)
        x = F.relu(x)
        x = self.dense2(x)
        x = F.relu(x)

        mean = self.dense3_1(x)
        log_var = self.dense3_2(x)

        return mean, log_var

    def sample(self, mean, log_var):
        std = torch.exp(0.5 * log_var)
        eps = torch.randn_like(std)

        return mean + std * eps

    def decode(self, z):
        x = self.dense4(z)
        x = F.relu(x)
        x = self.dense5(x)
        x = F.relu(x)
        x = self.dense6(x)

        return x

    def forward(self, x):
        mean, log_var = self.encode(x)
        z = self.sample(mean, log_var)
        x_ = self.decode(z)

        return x, mean, log_var
