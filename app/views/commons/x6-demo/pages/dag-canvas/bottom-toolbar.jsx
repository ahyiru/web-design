import {useCallback, useEffect, useState} from 'react';
import {Popover} from 'antd';
import {CloudUploadOutlined, LogoutOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {useObservableState} from '@app/views/commons/x6-demo/common/hooks/useObservableState';
import {useExperimentGraph} from '@app/views/commons/x6-demo/pages/rx-models/experiment-graph';
import styles from './bottom-toolbar.less';
export const BottomToolbar = props => {
  const {experimentId} = props;
  const expGraph = useExperimentGraph(experimentId);
  const [running] = useObservableState(expGraph.running$);
  const [preparingRun, setPreparingRun] = useState(false);
  const [preparingStop, setPreparingStop] = useState(false);
  useEffect(() => {
    setPreparingRun(false);
    setPreparingStop(false);
  }, [running]);
  const onRunExperiment = useCallback(() => {
    setPreparingRun(true);
    expGraph.runGraph().then(res => {
      if (!res.success) {
        setPreparingRun(false);
      }
    });
  }, [expGraph]);
  const onStopRunExperiment = useCallback(() => {
    setPreparingStop(true);
    expGraph.stopRunGraph().then(res => {
      if (!res.success) {
        setPreparingStop(false);
      }
    });
  }, [expGraph]);
  const runningConfigs = [
    {
      content: '运行',
      tip: '依次运行本实验的每个组件',
      icon: PlayCircleOutlined,
      disabled: preparingRun,
      clickHandler: onRunExperiment,
    },
    {
      content: '停止',
      tip: '停止运行实验',
      icon: LogoutOutlined,
      disabled: preparingStop,
      clickHandler: onStopRunExperiment,
    },
  ];
  const runningConfig = runningConfigs[Number(!!running)];
  const RunningIcon = runningConfig.icon;
  const cls = runningConfig.disabled ? `${styles.item} ${styles.disabled}` : styles.item;
  return (
    <div className={styles.bottomToolbar}>
      <ul className={styles.itemList}>
        <li className={styles.item}>
          <CloudUploadOutlined />
          <span>部署</span>
        </li>

        <Popover content={runningConfig.tip} overlayClassName={styles.popover}>
          <li className={cls} onClick={runningConfig.clickHandler}>
            <RunningIcon />
            <span>{runningConfig.content}</span>
          </li>
        </Popover>
      </ul>
    </div>
  );
};
