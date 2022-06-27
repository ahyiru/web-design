import {useCallback, useRef} from 'react';
import {PlaySquareOutlined, EditOutlined, CopyOutlined, DeleteOutlined} from '@ant-design/icons';
import {useClickAway} from '@huxy/use';
import {useObservableState} from '@app/views/commons/x6-demo/common/hooks/useObservableState';
import {Menu} from '@antv/x6-react-components';
import {useExperimentGraph} from '@app/views/commons/x6-demo/pages/rx-models/experiment-graph';
import {graphPointToOffsetPoint} from '@app/views/commons/x6-demo/pages/common//utils/graph';
import styles from './index.less';
export const NodeContextMenu = (props) => {
  const {experimentId, data} = props;
  const containerRef = useRef(null);
  const expGraph = useExperimentGraph(experimentId);
  const [activeNodeInstance] = useObservableState(() => expGraph.activeNodeInstance$);
  useClickAway(containerRef, () => {
    expGraph.clearContextMenuInfo();
  });
  const onNodeCopy = useCallback(async () => {
    await expGraph.onCopyNode(data.node);
  }, [expGraph, activeNodeInstance]);
  const onNodeDel = useCallback(async () => {
    await expGraph.requestDeleteNodes([data.node.id]);
  }, [expGraph, activeNodeInstance]);
  const onGraphRun = useCallback(async () => {
    await expGraph.runGraph();
  }, [expGraph]);
  const {x: left, y: top} = graphPointToOffsetPoint(expGraph.graph, data, expGraph.wrapper);
  return (
    <div ref={containerRef} className={styles.graphContextMenu} style={{top, left}}>
      <Menu hasIcon={true}>
        <Menu.Item onClick={onNodeCopy} icon={<CopyOutlined />} text="复制" />
        <Menu.Item onClick={onNodeDel} icon={<DeleteOutlined />} text="删除" />
        <Menu.Item disabled={true} icon={<EditOutlined />} text="重命名" />
        <Menu.Divider />
        <Menu.Item onClick={onGraphRun} icon={<PlaySquareOutlined />} text="执行" />
      </Menu>
    </div>
  );
};
