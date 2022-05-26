import { Input, ConfigProvider } from 'antd';
import { useObservableState } from '@app/views/commons/x6-demo/common/hooks/useObservableState';
import { ANT_PREFIX } from '@app/views/commons/x6-demo/constants/global';
export const RxInput = (props) => {
  const { value, ...otherProps } = props;
  const [realValue] = useObservableState(() => value);
  return (<ConfigProvider prefixCls={ANT_PREFIX}>
    <Input value={realValue} {...otherProps}/>
  </ConfigProvider>);
};
