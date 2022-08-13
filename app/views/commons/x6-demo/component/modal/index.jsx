import {createRoot} from 'react-dom/client';
import {Modal, ConfigProvider} from 'antd';
import {isPromise} from '@app/views/commons/x6-demo/common/utils';
import {ANT_PREFIX} from '@app/views/commons/x6-demo/constants/global';
export const showModal = props => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const rootNode = createRoot(div);
  let config = {
    ...props,
    visible: true,
    onCancel: close,
    onOk: e => {
      if (typeof props.onOk === 'function') {
        const ret = props.onOk(e);
        if (isPromise(ret)) {
          ret.then(() => {
            close();
          });
        }
      } else {
        close();
      }
    },
  };
  function destroy(...args) {
    const unmountResult = rootNode.unmount();
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (typeof props.afterClose === 'function') {
      props.afterClose(...args);
    }
  }
  function update(newConfig) {
    config = {
      ...config,
      ...newConfig,
    };
    render(config);
  }
  function close(...args) {
    const nextConfig = {
      ...config,
      visible: false,
      afterClose: destroy.bind(undefined, ...args),
    };
    update(nextConfig);
  }
  function render(usedConfig) {
    const {children, ...others} = usedConfig;
    setTimeout(() => {
      rootNode.render(
        <ConfigProvider prefixCls={ANT_PREFIX}>
          <Modal {...others}>{children}</Modal>
        </ConfigProvider>,
      );
    }, 0);
  }
  render(config);
  return {
    close,
    update,
  };
};
