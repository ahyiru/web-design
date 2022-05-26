import { LoadingOutlined } from '@ant-design/icons';
import { useObservableState } from '@app/views/commons/x6-demo/common/hooks/useObservableState';
import { useExperimentGraph } from '@app/views/commons/x6-demo/pages/rx-models/experiment-graph';
export const GraphRunningStatus = (props) => {
  const { className, experimentId } = props;
  const experimentGraph = useExperimentGraph(experimentId);
  const [executionStatus] = useObservableState(() => experimentGraph.executionStatus$);
  return (<div className={className}>
    {executionStatus?.status === 'preparing' && (<>
      <LoadingOutlined style={{ marginRight: 4 }}/> 准备中...
    </>)}
  </div>);
};
