import {Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;

export const designReg = /\/projects\/router\/[0-9a-z]+\/[0-9a-z]+/;

export const demoBackReg = /\/playground\/utils\/list\/auth\/[0-9a-z]+/;

export const confirmDesignPage = next => {
  confirm({
    title: '数据还未保存，是否确认离开？',
    icon: <ExclamationCircleOutlined />,
    content: '',
    onOk() {
      next();
    },
    onCancel() {
      next(false);
    },
  });
};
