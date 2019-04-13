import numpy as np

from torch.utils.data.dataset import Dataset


class ReshapeDataset(Dataset):
    def __init__(self, dataset, new_shape):
        self.dataset = dataset
        self.new_shape = new_shape

    def __getitem__(self, index):
        x, *xs = self.dataset[index]

        x_ = np.zeros(np.prod(self.new_shape))
        x_[:np.prod(x.shape)] = np.reshape(x, (-1,))
        x_ = np.reshape(x_, self.new_shape)

        return (x_, *xs)

    def __len__(self):
        return len(self.dataset)
