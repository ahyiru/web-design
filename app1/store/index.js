import {createStore, createContainer} from '@huxy/utils';
import {createContainer as createUseContainer} from '@huxy/use';

export const container = createStore();

export const store = createContainer(container);
export const useStore = createUseContainer(container);
