import {Input, ConfigProvider} from 'antd';
import {useObservableState} from '../../common/hooks/useObservableState';
import {ANT_PREFIX} from '../../constants/global';
export const RxInput = props => {
  const {value, ...otherProps} = props;
  const [realValue] = useObservableState(() => value);
  return (
    <ConfigProvider prefixCls={ANT_PREFIX}>
      <Input value={realValue} {...otherProps} />
    </ConfigProvider>
  );
};
