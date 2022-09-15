import {useRef} from 'react';
import {ReloadOutlined} from '@ant-design/icons';
import {useClickAway} from '@huxy/use';
import {Menu} from '@antv/x6-react-components';
import {useExperimentGraph} from '@app/views/commons/x6-demo/pages/rx-models/experiment-graph';
import {graphPointToOffsetPoint} from '@app/views/commons/x6-demo/pages/common/utils/graph';
import styles from './index.less';
export const GraphContextMenu = props => {
  const {experimentId, data} = props;
  const containerRef = useRef(null);
  const expGraph = useExperimentGraph(experimentId);
  useClickAway(containerRef, () => {
    expGraph.clearContextMenuInfo();
  });
  const {x: left, y: top} = graphPointToOffsetPoint(expGraph.graph, data, expGraph.wrapper);
  return (
    <div ref={containerRef} className={styles.graphContextMenu} style={{top, left}}>
      <Menu hasIcon={true}>
        <Menu.Item disabled={true} icon={<ReloadOutlined />} text="刷新" />
      </Menu>
    </div>
  );
};
