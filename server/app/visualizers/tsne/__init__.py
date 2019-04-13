import torch

from app.models.tsne import ParametricTSNE
from app.models.utils import map_location
from app.utils import relpath

device = torch.device('cuda')


def fit_transform(dataset, y_):
    model = ParametricTSNE(dataset.x.shape[1], 128, 2).to(device)
    model.load_state_dict(torch.load(relpath(__file__, f"{dataset.name}.pth"), map_location=map_location))

    with torch.no_grad():
        model.eval()

        x = torch.tensor(dataset.x, dtype=torch.float).to(device)

        z_ = model(x)
        z_ = z_.cpu().numpy()

    return z_
