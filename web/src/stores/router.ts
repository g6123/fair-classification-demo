import { RouterStore } from 'mobx-react-router';
import { useObservable } from 'mobx-react-lite';

export const routerStore = new RouterStore();

export const useRouter = (): RouterStore => useObservable(routerStore);
