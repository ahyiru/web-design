import {ConfigProvider} from 'antd';
import {filter, map} from 'rxjs/operators';
import {DatabaseFilled} from '@ant-design/icons';
import {useObservableState} from '../../../common/hooks/useObservableState';
import {ANT_PREFIX} from '../../../constants/global';
import {useExperimentGraph} from '../../rx-models/experiment-graph';
import {NodeStatus} from '../../common/graph-common/node-status';
import {NodePopover} from '../../common/graph-common/node-popover';
import styles from './node-element.less';
export const NodeElement = props => {
  const {experimentId, node} = props;
  const experimentGraph = useExperimentGraph(experimentId);
  const [instanceStatus] = useObservableState(
    () =>
      experimentGraph.executionStatus$.pipe(
        filter(x => !!x),
        map(x => x.execInfo),
      ),
    {},
  );
  const data = node?.getData() || {};
  const {name, id, selected} = data;
  const nodeStatus = instanceStatus[id] || {};
  const cls = selected ? `${styles.nodeElement} ${styles.selected}` : styles.nodeElement;
  return (
    <ConfigProvider prefixCls={ANT_PREFIX}>
      <NodePopover status={nodeStatus}>
        <div className={cls}>
          <div className={styles.icon}>
            <DatabaseFilled style={{color: '#1890ff'}} />
          </div>
          <div className={styles.notation}>
            <div className={styles.name}>{name}</div>
            {nodeStatus.jobStatus && <NodeStatus className={styles.statusIcon} status={nodeStatus.jobStatus} />}
          </div>
        </div>
      </NodePopover>
    </ConfigProvider>
  );
};
