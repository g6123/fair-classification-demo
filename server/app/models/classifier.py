from torch.nn import Conv2d, Dropout, Linear, LogSoftmax, ReLU, Sequential

from app.models.flatten import Flatten


def Classifier():
    return Sequential(
        Conv2d(1, 8, kernel_size=3),
        ReLU(),
        Conv2d(8, 16, kernel_size=3),
        ReLU(),
        Conv2d(16, 32, kernel_size=3),
        ReLU(),
        Flatten(),
        Linear(32 * 5 * 4, 32),
        ReLU(),
        Linear(32, 2),
        LogSoftmax(dim=1)
    )
