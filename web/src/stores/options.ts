import { observable, computed, toJS } from 'mobx';
import { useObservable } from 'mobx-react-lite';

class OptionsStore {
  @observable
  public dataset: string | null = null;

  @observable
  public method: { type: string | null; [key: string]: any } = { type: null };

  @observable
  public reducer: string | null = null;

  @observable
  public realtime: boolean = true;

  @observable
  public showDebug: boolean = false;

  @computed
  public get isSubmittable(): boolean {
    return this.dataset !== null && this.method !== null && this.reducer !== null;
  }

  public toJSON(): any {
    return {
      dataset: this.dataset,
      method: toJS(this.method),
      reducer: this.reducer,
      realtime: this.realtime,
    };
  }
}

export const optionsStore = new OptionsStore();

export const useOptions = (): OptionsStore => useObservable(optionsStore);
