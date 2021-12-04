import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import {components} from '@common';
const {FullPage}=components;

const Index=({panel})=><a><FullPage panel={panel} fullIcon={FullscreenOutlined} exitIcon={FullscreenExitOutlined} /></a>;

export default Index;

