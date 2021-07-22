import customRender from '@app/utils/render';
import {utils} from '@common';
const Index=props=>{
  const pageSchema=utils.session.get(props?.params?.routerId);
  return customRender(pageSchema||[],{},props);
};

export default Index;


