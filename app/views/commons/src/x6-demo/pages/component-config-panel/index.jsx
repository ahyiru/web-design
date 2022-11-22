import {Tabs} from 'antd';
import {useObservableState} from '../../common/hooks/useObservableState';
import {useExperimentGraph} from '../rx-models/experiment-graph';
import {ExperimentForm} from './form/experiment-config';
import {NodeFormDemo} from './form/node-config';
import css from './index.less';
export const ComponentConfigPanel = props => {
  const {experimentId, className} = props;
  const expGraph = useExperimentGraph(experimentId);
  const [activeNodeInstance] = useObservableState(() => expGraph.activeNodeInstance$);
  const nodeId = activeNodeInstance && activeNodeInstance.id;
  const items = [
    {
      key: 'setting',
      label: '参数设置',
      children: <div className={css.form}>
        {nodeId && <NodeFormDemo name="节点参数" nodeId={nodeId} experimentId={experimentId} />}
        {!nodeId && <ExperimentForm name="实验设置" experimentId={experimentId} />}
      </div>,
    },
    {
      key: 'params',
      label: '全局参数',
      disabled: true,
      children: <div className={css.form} />,
    },
  ];
  return (
    <div className={className}>
      <div className={css.setting}>
        <Tabs defaultActiveKey="setting" type="card" size="middle" tabPosition="top" destroyInactiveTabPane={true} items={items} />
      </div>
      <div className={css.footer} />
    </div>
  );
};
