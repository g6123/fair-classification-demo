import io

import numpy as np
import pandas as pd


def read_uci_names(filename, append_cat=None, append_cont=None):
    if append_cat is None:
        append_cat = []

    if append_cont is None:
        append_cont = []

    cols = []
    cols_cat = []
    cols_cont = []

    with io.open(filename, 'r', encoding='utf-8') as lines:
        for line in lines:
            line = line.strip()

            if len(line) == 0:
                continue

            if line.startswith("|"):
                continue

            if ':' not in line:
                continue

            line = line.split(":", 1)

            cols.append(line[0])

            if line[1].strip() == "continuous.":
                cols_cont.append(line[0])
            else:
                cols_cat.append(line[0])

    cols += (append_cat + append_cont)
    cols_cat += append_cat
    cols_cont += append_cont

    return cols, cols_cat, cols_cont


def read_uci_data(*filenames, **kwargs):
    dfs = []

    for filename in filenames:
        df = pd.read_csv(filename, header=None, skipinitialspace=True, comment="|", **kwargs)
        df[df.columns[-1]] = df[df.columns[-1]].str.rstrip(".")
        dfs.append(df)

    df_all = pd.concat(dfs, ignore_index=True)
    dfs.insert(0, df_all)

    return dfs


def to_iloc(loc):
    return np.arange(len(loc))[loc]


def to_categorical(y, num_classes=None, dtype='float32'):
    """Converts a class vector (integers) to binary class matrix.
    E.g., for use with categorical_crossentropy.
    # Arguments
        y: class vector to be converted into a matrix
            (integers from 0 to num_classes).
        num_classes: total number of classes.
        dtype: The data type expected by the input, as a string
            (`float32`, `float64`, `int32`...)
    # Returns
        A binary matrix representation of the input. The classes axis
        is placed last.
    # Example
    ```python
    # Consider an array of 5 labels out of a set of 3 classes {0, 1, 2}:
    > labels
    array([0, 2, 1, 2, 0])
    # `to_categorical` converts this into a matrix with as many
    # columns as there are classes. The number of rows
    # stays the same.
    > to_categorical(labels)
    array([[ 1.,  0.,  0.],
           [ 0.,  0.,  1.],
           [ 0.,  1.,  0.],
           [ 0.,  0.,  1.],
           [ 1.,  0.,  0.]], dtype=float32)
    ```
    """

    y = np.array(y, dtype='int')
    input_shape = y.shape
    if input_shape and input_shape[-1] == 1 and len(input_shape) > 1:
        input_shape = tuple(input_shape[:-1])
    y = y.ravel()
    if not num_classes:
        num_classes = np.max(y) + 1
    n = y.shape[0]
    categorical = np.zeros((n, num_classes), dtype=dtype)
    categorical[np.arange(n), y] = 1
    output_shape = input_shape + (num_classes,)
    categorical = np.reshape(categorical, output_shape)
    return categorical


def get_dummy_slices(df, prefix_sep="_"):
    widths = []
    last_col = None

    for col in df.columns:
        col = col.split(prefix_sep, 1)[0]

        if last_col == col:
            widths[-1] += 1
        else:
            widths.append(1)

        last_col = col

    slices = []
    last_idx = 0

    for width in widths:
        slices.append(slice(last_idx, last_idx + width))
        last_idx += width

    return slices
