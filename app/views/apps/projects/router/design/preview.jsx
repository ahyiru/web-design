import {session} from '@huxy/utils';
import customRender from '@app/utils/render';

const Index = (props) => {
  const pageSchema = session.get(props?.params?.routerId);
  return customRender(pageSchema || [], {}, props);
};

export default Index;
