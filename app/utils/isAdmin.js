import {userInfoStore} from '@app/store/stores';

export const profile = () => userInfoStore.getState();

export const notAdmin = () => profile()?.role < 5;
