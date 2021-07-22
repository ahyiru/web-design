import customRender from '@app/utils/render';
import {components} from '@common';
const {Spinner}=components;
const Index=props=>{
  const {pageSchema}=props;
  if(pageSchema==null||pageSchema.pending){
    return <Spinner global />;
  }
  return customRender(pageSchema.result||[],{},props);
};

export default Index;


