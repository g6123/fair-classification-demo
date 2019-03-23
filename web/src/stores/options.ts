import { observable, computed, toJS, action } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { items as methods } from '../domain/methods';

class OptionsStore {
  @observable
  public dataset: string | null = null;

  @observable
  public method: { type: string | null; [key: string]: any } = { type: null };

  @observable
  public visualizer: string | null = null;

  @observable
  public realtime: boolean = true;

  @computed
  public get isSubmittable(): boolean {
    return this.dataset !== null && this.method !== null && this.visualizer !== null;
  }

  public constructor() {
    this.dataset = 'adult';
    this.setMethodType('none');
    this.visualizer = 'tsne';
  }

  @action
  public setMethodType(value: string | null): void {
    const method = methods.find(({ id }) => id === value);

    if (method === undefined || method.options === undefined) {
      this.method = { type: value };
    } else {
      this.method = (method.options as { id: string; defaultValue: any; [key: string]: any }[]).reduce(
        (acc: any, option) => {
          acc[option.id] = option.defaultValue || null;
          return acc;
        },
        {
          type: value,
        },
      );
    }
  }

  public toJSON(): any {
    return {
      dataset: this.dataset,
      method: toJS(this.method),
      visualizer: this.visualizer,
      realtime: this.realtime,
    };
  }
}

export const optionsStore = new OptionsStore();

export const useOptions = (): OptionsStore => useObservable(optionsStore);
