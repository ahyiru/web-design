import {useCallback, useEffect, useRef} from 'react';
import '@antv/x6-react-shape';
import {useDrop} from 'react-dnd';
import {message} from '@app/utils/staticFunction';
import {DRAGGABLE_ALGO_COMPONENT, DRAGGABLE_MODEL} from '../../constants/graph';
import {useExperimentGraph} from '../rx-models/experiment-graph';
import {FloatingContextMenu} from './elements/floating-context-menu';
import {CanvasHandler} from '../common/canvas-handler';
import {GraphRunningStatus} from './elements/graph-running-status';
import styles from './canvas-content.less';
export const CanvasContent = props => {
  const {experimentId, className = ''} = props;
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const expGraph = useExperimentGraph(experimentId);
  useEffect(() => {
    expGraph.renderGraph(containerRef.current, canvasRef.current);
  }, [expGraph]);
  const [, dropRef] = useDrop({
    accept: [DRAGGABLE_ALGO_COMPONENT, DRAGGABLE_MODEL],
    drop: (item, monitor) => {
      const currentMouseOffset = monitor.getClientOffset();
      const sourceMouseOffset = monitor.getInitialClientOffset();
      const sourceElementOffset = monitor.getInitialSourceClientOffset();
      const diffX = sourceMouseOffset.x - sourceElementOffset.x;
      const diffY = sourceMouseOffset.y - sourceElementOffset.y;
      const x = currentMouseOffset.x - diffX;
      const y = currentMouseOffset.y - diffY;
      if (expGraph.isGraphReady()) {
        expGraph.requestAddNode({
          clientX: x,
          clientY: y,
          nodeMeta: item.component,
        });
      } else {
        message.info('实验数据建立中，请稍后再尝试添加节点');
      }
    },
  });
  const onHandleSideToolbar = useCallback(
    action => () => {
      if (expGraph.isGraphReady()) {
        switch (action) {
        case 'in':
          expGraph.zoomGraph(0.1);
          break;
        case 'out':
          expGraph.zoomGraph(-0.1);
          break;
        case 'fit':
          expGraph.zoomGraphToFit();
          break;
        case 'real':
          expGraph.zoomGraphRealSize();
          break;
        default:
        }
      }
    },
    [expGraph],
  );
  return (
    <div
      ref={elem => {
        containerRef.current = elem;
        dropRef(elem);
      }}
      className={`${styles.canvasContent} ${className}`}
    >
      <FloatingContextMenu experimentId={experimentId} />

      <CanvasHandler onZoomIn={onHandleSideToolbar('in')} onZoomOut={onHandleSideToolbar('out')} onFitContent={onHandleSideToolbar('fit')} onRealContent={onHandleSideToolbar('real')} />

      <GraphRunningStatus className={styles.runningStatus} experimentId={experimentId} />

      <div ref={canvasRef} />
    </div>
  );
};
