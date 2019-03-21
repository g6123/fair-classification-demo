import numpy as np
import pandas as pd
from ordered_set import OrderedSet

import torch
from torch.utils.data.dataset import Dataset

from app.datasets.utils import relpath, read_uci_names, read_uci_data, to_ilocs, scale


class AdultDataset(Dataset):
    col_a = "sex"
    col_y = "income"
    cols, cols_cat, cols_cont = read_uci_names(relpath(__file__, 'adult.names'), append_cat=[col_y])
    cols_x = list(OrderedSet(cols) - {col_y})

    df_all, df_train, df_test = read_uci_data(relpath(__file__, 'adult.data.gz'),
                                              relpath(__file__, 'adult.test.gz'),
                                              names=cols,
                                              compression="gzip")

    iloc_all = np.arange(len(df_all.index))
    iloc_train = np.arange(len(df_train.index))
    iloc_test = np.arange(len(df_test.index)) + len(df_train.index)

    x_all = df_all[cols_x]
    x_all = df_x = pd.get_dummies(x_all, columns=list(OrderedSet(cols_x) & OrderedSet(cols_cat)))
    x_all = x_all.values.astype(np.float)
    x_all = scale(x_all, fit_to=x_all[iloc_train])

    y_all = df_all[col_y]
    y_all, _ = pd.factorize(y_all)

    def __init__(self, train=True, test=True):
        iloc = np.copy(self.iloc_all)

        if not train:
            iloc = np.setdiff1d(iloc, self.iloc_train)

        if not test:
            iloc = np.setdiff1d(iloc, self.iloc_test)

        self.df = self.df_all.iloc[iloc]
        self.x = self.x_all[iloc]
        self.y = self.y_all[iloc]
        self.ilocs = to_ilocs(self.df_all.iloc[iloc][self.col_a])

    def __getitem__(self, index):
        return self.x[index], self.y[index]

    def __len__(self):
        return len(self.x)
