import numpy as np

from torch.utils.data.dataset import Dataset


class ReshapeDataset(Dataset):
    def __init__(self, dataset, new_shape):
        self.dataset = dataset
        self.new_shape = new_shape

    def __getitem__(self, index):
        input, target = self.dataset[index]

        new_input = np.zeros(np.prod(self.new_shape))
        new_input[:np.prod(input.shape)] = np.reshape(input, (-1,))
        new_input = np.reshape(new_input, self.new_shape)

        return new_input, target

    def __len__(self):
        return len(self.dataset)
