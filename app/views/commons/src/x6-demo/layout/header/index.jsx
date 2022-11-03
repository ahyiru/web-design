import {Layout} from 'antd';
import {GithubOutlined} from '@ant-design/icons';
import {useObservableState} from '../../common/hooks/useObservableState';
import {useExperimentGraph} from '../../pages/rx-models/experiment-graph';
import {SimpleLogo} from './logo';
import {ExperimentTitle} from './experiment-title';
import css from './index.less';
const {Header} = Layout;
export const GuideHeader = props => {
  const expGraph = useExperimentGraph(props.experimentId);
  const [activeExperiment] = useObservableState(expGraph.experiment$);
  const openGithub = () => {
    // window.open('https://github.com/antvis/X6/tree/master/examples/x6-app-dag', '_blank');
  };
  return (
    <>
      <Header className={css.header}>
        <div className={css.headerLeft}>
          <SimpleLogo />
          <ExperimentTitle experimentName={activeExperiment.name} />
        </div>
        <div className={css.headerRight}>
          <div className={css.doc}>
            <GithubOutlined onClick={openGithub} />
          </div>
        </div>
      </Header>
    </>
  );
};
