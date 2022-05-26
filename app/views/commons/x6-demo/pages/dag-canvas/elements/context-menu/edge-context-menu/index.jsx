import { useCallback, useRef } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useClickAway } from '@huxy/use';
import { Menu } from '@antv/x6-react-components';
import { useExperimentGraph } from '@app/views/commons/x6-demo/pages/rx-models/experiment-graph';
import { graphPointToOffsetPoint } from '@app/views/commons/x6-demo/pages/common//utils/graph';
import styles from './index.less';
export const EdgeContextMenu = (props) => {
  const { experimentId, data } = props;
  const containerRef = useRef(null);
  const expGraph = useExperimentGraph(experimentId);
  useClickAway(containerRef, () => {
    expGraph.clearContextMenuInfo();
  });
  const onDeleteEdge = useCallback(() => {
    expGraph.deleteEdgeFromContextMenu(data.edge);
  }, [expGraph, data]);
  const { x: left, y: top } = graphPointToOffsetPoint(expGraph.graph, data, expGraph.wrapper);
  return (<div ref={containerRef} className={styles.edgeContextMenu} style={{ top, left }}>
    <Menu hasIcon={true}>
      <Menu.Item onClick={onDeleteEdge} icon={<DeleteOutlined />} text="删除"/>
    </Menu>
  </div>);
};
