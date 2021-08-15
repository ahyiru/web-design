import {Button} from 'antd';
import customRender from '@app/utils/render';
import {components} from '@common';
const {Spinner}=components;
const Index=props=>{
  const {pageSchema}=props;
  if(pageSchema==null||pageSchema.pending){
    return <Spinner global />;
  }
  const i18ns=props.store.getState('i18ns');
  const i18nCfg=i18ns?.main.projectRouter??{};
  const {pageText={}}=i18nCfg;
  return <div>
    <div style={{overflow:'hidden',marginBottom:10}}>
      <Button onClick={e=>props.router.push('/projects/router/6098f12b099e1202a287acad')} type="link" size="small" style={{float:'right'}}>{pageText.design_text}</Button>
    </div>
    {customRender(pageSchema.result||[],{},props)}
  </div>;
};

export default Index;


