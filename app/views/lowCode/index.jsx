import {Button} from 'antd';
import {Spinner} from '@huxy/components';
import customRender from '@app/utils/render';
const Index = (props) => {
  const {pageSchema, id, path, name} = props;
  if (pageSchema == null || pageSchema.pending) {
    return <Spinner global />;
  }
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.main?.projectRouter ?? {};
  const {pageText = {}} = i18nCfg;
  const key = path.indexOf('#') === 0 ? path.slice(1) : path;
  return (
    <div>
      <div style={{overflow: 'hidden', marginBottom: 10}}>
        <Button onClick={(e) => props.router.push({path: '/apps/projects/router/6098f12b099e1202a287acad', params: {name, _id: id, key, path: key}})} type="link" size="small" style={{float: 'right'}}>
          {pageText.design_text}
        </Button>
      </div>
      {customRender(pageSchema.result || [], {}, props)}
    </div>
  );
};

export default Index;
