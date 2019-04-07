import { observable } from 'mobx';
import { useObservable } from 'mobx-react-lite';

class ProgressStore {
  @observable
  public value: number = 0;

  @observable
  public max: number = 0;

  @observable
  public message: string = '';
}

export const progressStore = new ProgressStore();

export const useProgress = (): ProgressStore => useObservable(progressStore);
