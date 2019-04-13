from sklearn.metrics import confusion_matrix


def set_dataset(dataset):
    name = dataset.name

    dataset = dataset.df.to_dict(orient='split')
    dataset.pop('index', None)

    return {
        'type': 'SET_DATASET',
        'name': name,
        **dataset,
    }


def set_points(y, y_, z, locs):
    return {
        'type': 'SET_POINTS',
        'grounds': y.tolist(),
        'predictions': y_.tolist(),
        'positions': z.tolist(),
        'reports': {k: confusion_matrix(y[v], y_[v]).tolist() for k, v in locs.items()},
    }


def set_progress(current, total, message=""):
    return {
        'type': 'SET_PROGRESS',
        'value': current,
        'max': total,
        'message': message,
    }


def set_error(message):
    return {
        'type': 'SET_ERROR',
        'message': message,
    }
