import torch

from app.models.tsne import ParametricTSNE
from app.utils import relpath

device = torch.device('cuda')


def fit_transform(dataset, y_):
    model = ParametricTSNE(dataset.x.shape[1], 128, 2).to(device)

    state_filepath = relpath(__file__, "{}.pth".format(dataset.name))
    model.load_state_dict(torch.load(state_filepath))

    with torch.no_grad():
        model.eval()

        x = torch.tensor(dataset.x, dtype=torch.float).to(device)

        z_ = model(x)
        z_ = z_.cpu().numpy()

    return z_
