import { observable, computed } from 'mobx';
import { useObservable } from 'mobx-react-lite';

class OptionsStore {
  @observable
  public dataset: string | null = null;

  @observable
  public method: string | null = null;

  @observable
  public reducer: string | null = null;

  @observable
  public isRealtime: boolean = false;

  @observable
  public showDebug: boolean = false;

  @computed
  public get isSubmittable(): boolean {
    return this.dataset !== null && this.method !== null && this.reducer !== null;
  }
}

export const optionsStore = new OptionsStore();

export const useOptions = (): OptionsStore => useObservable(optionsStore);
