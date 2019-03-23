from torch import nn
from torch.nn import functional as F


class ParametricTSNE(nn.Module):
    def __init__(self, dim_x, dim_h, dim_z):
        super(ParametricTSNE, self).__init__()

        self.dense1 = nn.Linear(dim_x, dim_h)
        self.batch_norm1 = nn.BatchNorm1d(dim_h)
        self.dense2 = nn.Linear(dim_h, dim_h)
        self.batch_norm2 = nn.BatchNorm1d(dim_h)
        self.dense3 = nn.Linear(dim_h, dim_h)
        self.batch_norm3 = nn.BatchNorm1d(dim_h)
        self.dense4 = nn.Linear(dim_h, dim_z)

    def forward(self, x):
        x = self.dense1(x)
        x = self.batch_norm1(x)
        x = F.relu(x)
        x = self.dense2(x)
        x = self.batch_norm2(x)
        x = F.relu(x)
        x = self.dense3(x)
        x = self.batch_norm3(x)
        x = F.relu(x)
        x = self.dense4(x)

        return x
