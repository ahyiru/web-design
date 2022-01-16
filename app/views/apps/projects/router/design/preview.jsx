import customRender from '@app/utils/render';
import session from 'ihuxy-utils/session';
const Index = (props) => {
  const pageSchema = session.get(props?.params?.routerId);
  return customRender(pageSchema || [], {}, props);
};

export default Index;
