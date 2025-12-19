import {userInfoStore} from '@app/store/stores';

export const profile = () => userInfoStore.getState();

export const notAdmin = () => false;//profile()?.role !== 5;

export const isMember = () => true;//profile()?.payCount;
