import {useEffect} from 'react';
import {useExperimentGraph, useUnmountExperimentGraph} from '../rx-models/experiment-graph';
import {CanvasContent} from './canvas-content';
import {CanvasToolbar} from './canvas-toolbar';
import {BottomToolbar} from './bottom-toolbar';
import styles from './index.less';
export const DAGCanvas = props => {
  const {experimentId, className = ''} = props;
  const expGraph = useExperimentGraph(experimentId);
  useUnmountExperimentGraph(experimentId);
  useEffect(() => {
    window.renderForm = expGraph.setActiveAlgoData;
    return () => {
      delete window.renderForm;
    };
  }, [expGraph]);
  return (
    <div className={`${styles.dagContainer} ${className}`}>
      <CanvasToolbar experimentId={experimentId} />
      <CanvasContent experimentId={experimentId} className={styles.canvasContent} />
      <BottomToolbar experimentId={experimentId} />
    </div>
  );
};
