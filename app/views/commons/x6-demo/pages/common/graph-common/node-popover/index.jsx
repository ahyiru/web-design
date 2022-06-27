import {Popover} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {isValidObj} from '@huxy/utils';
import css from './index.less';
export const NodePopover = ({children, status}) => {
  const componentNode = <div style={{width: '100%', height: '100%'}}>{children}</div>;
  if (!isValidObj(status)) {
    return componentNode;
  }
  return (
    <Popover placement="bottomLeft" content={<PopoverContent status={status} />} overlayClassName={css.content}>
      {componentNode}
    </Popover>
  );
};
const nodeAtts = {
  name: '节点名称',
  defName: '算法名称',
  jobStatus: '运行状态',
  startTime: '开始时间',
  endTime: '结束时间',
};
const PopoverContent = ({status}) => (
  <ul className={css.list}>
    {!status.name && <LoadingOutlined />}
    {Object.entries(nodeAtts).map(([key, text]) => {
      const value = status[key];
      if (value) {
        return (
          <li key={key} className={css.item}>
            <span className={css.label}>{text}</span>
            <span className={css.text}>{value}</span>
          </li>
        );
      }
      return null;
    })}
  </ul>
);
