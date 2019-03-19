import { observable, action } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { simpleRandomString } from '../utils/misc';

class DebugStore {
  @observable
  public logs: Log[] = [];

  @action
  public log = (level: string, content: string): void => {
    this.logs.push({
      id: simpleRandomString(),
      date: Date.now(),
      level,
      content,
    });
  };
}

export const debugStore = new DebugStore();

export const useDebug = (): DebugStore => useObservable(debugStore);

export interface Log {
  id: string;
  date: number;
  level: string;
  content: string;
}
