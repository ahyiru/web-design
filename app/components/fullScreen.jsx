import {FullscreenOutlined, FullscreenExitOutlined} from '@ant-design/icons';
import {components} from '@common';
const {FullPage} = components;

const Index = ({panel}) => <FullPage panel={panel} fullIcon={FullscreenOutlined} exitIcon={FullscreenExitOutlined} />;

export default Index;

