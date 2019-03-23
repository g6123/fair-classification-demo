import { observable } from 'mobx';
import { useObservable } from 'mobx-react-lite';

class DatasetStore {
  @observable
  public columns: string[] = [];

  @observable
  public data: { [key: string]: any }[] = [];

  @observable
  public grounds: number[] = [];

  @observable
  public predictions: number[] = [];

  @observable
  public positions: [number, number][] = [];

  @observable
  public progress: [number, number] = [0, 0];
}

export const datasetStore = new DatasetStore();

export const useDataset = (): DatasetStore => useObservable(datasetStore);
