from torch.nn import Module
from torch.nn import Linear, ReLU
from torch.nn import functional as F

class VAE(Module):
    def __init__(self, dim_x, dim_h, dim_z):
        super(VAE, self).__init__()

        self.dense1 = Linear(dim_x, dim_h)
        self.dense2 = Linear(dim_h, dim_h)
        self.dense3_1 = Linear(dim_h, dim_z)
        self.dense3_2 = Linear(dim_h, dim_z)
        self.sample = lambda mean, var: x
        self.dense4 = Linear(dim_x, dim_h)
        self.dense5 = Linear(dim_h, dim_h)

    def forward(self, x):
        x = self.dense1(x)
        x = F.relu(x)
        x = self.dense2(x)
        x = F.relu(x)

        mean = self.dense3_1(x)
        var = self.dense3_2(x)
        z = self.sample(mean, var)

        x = self.dense4(z)
        x = F.relu(x)
        x = self.dense5(x)
        x = F.relu(x)

        return x
