import { observable } from 'mobx';
import { useObservable } from 'mobx-react-lite';

class DatasetStore {
  @observable
  public columns: string[] = [];

  @observable
  public data: { [key: string]: any }[] = [];

  @observable
  public predictions: number[] = [];

  @observable
  public grounds: number[] = [];
}

export const datasetStore = new DatasetStore();

export const useDataset = (): DatasetStore => useObservable(datasetStore);
