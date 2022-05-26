import { Tabs } from 'antd';
import { useObservableState } from '@app/views/commons/x6-demo/common/hooks/useObservableState';
import { useExperimentGraph } from '@app/views/commons/x6-demo/pages/rx-models/experiment-graph';
import { ExperimentForm } from './form/experiment-config';
import { NodeFormDemo } from './form/node-config';
import css from './index.less';
export const ComponentConfigPanel = (props) => {
  const { experimentId, className } = props;
  const expGraph = useExperimentGraph(experimentId);
  const [activeNodeInstance] = useObservableState(() => expGraph.activeNodeInstance$);
  const nodeId = activeNodeInstance && activeNodeInstance.id;
  return (<div className={className}>
    <div className={css.setting}>
      <Tabs defaultActiveKey="setting" type="card" size="middle" tabPosition="top" destroyInactiveTabPane={true}>
        <Tabs.TabPane tab="参数设置" key="setting">
          <div className={css.form}>
            {nodeId && (<NodeFormDemo name="节点参数" nodeId={nodeId} experimentId={experimentId}/>)}
            {!nodeId && (<ExperimentForm name="实验设置" experimentId={experimentId}/>)}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="全局参数" key="params" disabled={true}>
          <div className={css.form}/>
        </Tabs.TabPane>
      </Tabs>
    </div>
    <div className={css.footer}/>
  </div>);
};
