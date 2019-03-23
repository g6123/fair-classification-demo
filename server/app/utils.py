from os import path

from sklearn.preprocessing import MinMaxScaler


def relpath(base, target):
    return path.join(path.dirname(base), target)


def scale(arr, fit_to=None, scaler=None):
    if fit_to is None:
        fit_to = arr

    if scaler is None:
        scaler = MinMaxScaler

    scaler = scaler()
    scaler.fit(fit_to)
    return scaler.transform(arr)
