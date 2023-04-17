import {App} from 'antd';

let message;
let notification;
let modal;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export {message, notification, modal};
