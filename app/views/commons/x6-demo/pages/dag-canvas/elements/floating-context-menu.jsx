import {useObservableState} from '@app/views/commons/x6-demo/common/hooks/useObservableState';
import {useExperimentGraph} from '@app/views/commons/x6-demo/pages/rx-models/experiment-graph';
import {EdgeContextMenu} from './context-menu/edge-context-menu';
import {GraphContextMenu} from './context-menu/graph-context-menu';
import {NodeContextMenu} from './context-menu/node-context-menu';
import css from './floating-context-menu.less';
export const ContextMenu = props => {
  const {experimentId, menuType, menuData} = props;
  switch (menuType) {
  case 'edge':
    return <EdgeContextMenu experimentId={experimentId} data={menuData} />;
  case 'graph':
    return <GraphContextMenu experimentId={experimentId} data={menuData} />;
  case 'node':
    return <NodeContextMenu experimentId={experimentId} data={menuData} />;
  default:
    return null;
  }
};
export const FloatingContextMenu = props => {
  const {experimentId} = props;
  const expGraph = useExperimentGraph(experimentId);
  const [contextMenuInfo] = useObservableState(() => expGraph.contextMenuInfo$);
  if (!contextMenuInfo?.type) {
    return null;
  }
  return (
    <div className={css.mask}>
      <ContextMenu experimentId={experimentId} menuData={contextMenuInfo.data} menuType={contextMenuInfo.type} />
    </div>
  );
};
