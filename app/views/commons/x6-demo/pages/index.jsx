import { Layout } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GuideHeader } from '@app/views/commons/x6-demo/layout/header';
import { ComponentTreePanel } from './component-tree-panel';
import { ComponentConfigPanel } from './component-config-panel';
import { DAGCanvas } from './dag-canvas';
import styles from './index.less';
const { Content } = Layout;
const DagDemo = (props) => {
  const {id}=props.params;
  const { experimentId = '1' } = props;
  return (<Layout className={`${styles.layout} ${id?styles['full']:''}`}>
    <GuideHeader experimentId={experimentId}/>
    <Content className={styles.content}>
      <div className={styles.experiment}>
        <DndProvider backend={HTML5Backend}>
          <ComponentTreePanel experimentId={experimentId} className={styles.nodeSourceTree}/>
          <div className={styles.editPanel}>
            <DAGCanvas experimentId={experimentId} className={styles.dagCanvas}/>
            <ComponentConfigPanel experimentId={experimentId} className={styles.confPanel}/>
          </div>
        </DndProvider>
      </div>
    </Content>
  </Layout>);
};
export default DagDemo;
