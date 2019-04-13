import numpy as np

from app import actions
from app.classifiers import classifiers
from app.utils import scale


def run(train_dataset, test_dataset, visualizer, action):
    classifier_type = action.get('method', {}).get('classifier', {}).get('type', None)

    Classifier = classifiers[classifier_type]
    classifier = Classifier(train_dataset, test_dataset)

    if classifier_type not in classifiers:
        yield actions.set_error("Unkown classifier type")
        return

    epochs = classifier.epochs

    for epoch in classifier.fit():
        y_ = classifier.predict()

        z_ = visualizer(test_dataset, y_)
        z_ = scale(z_)

        y = test_dataset.y
        y_ = np.argmax(y_, axis=1)

        yield actions.set_points(y, y_, z_, test_dataset.ilocs)
        yield actions.set_progress(epoch, epochs, "Classifying...")

    yield actions.set_progress(epochs, epochs, "Done")
