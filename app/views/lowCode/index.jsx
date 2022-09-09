import {Button} from 'antd';
import {Spinner} from '@huxy/components';
import customRender from '@app/utils/render';
import {useIntls} from '@app/components/intl';
import defProject from '@app/configs/projects';
const Index = props => {
  const getIntls = useIntls();
  const {pageSchema, id, path, name} = props;
  if (pageSchema == null || pageSchema.pending) {
    return <Spinner global />;
  }
  const key = path.indexOf('#') === 0 ? path.slice(1) : path;
  return (
    <div>
      <div style={{overflow: 'hidden', marginBottom: 10}}>
        <h4 style={{margin: 0, float: 'left'}}>{getIntls('main.projectRouter.pageText.preview_text')}</h4>
        <Button onClick={e => props.router.push({path: `/apps/projects/router/${defProject._id}`, params: {name, _id: id, key, path: key}})} type="link" size="small" style={{float: 'right'}}>
          {getIntls('main.projectRouter.pageText.design_text')}
        </Button>
      </div>
      <div style={{border: '1px solid rgba(255, 255, 255, .2)', padding: '10px'}}>{customRender(pageSchema.result || [], {}, props)}</div>
    </div>
  );
};

export default Index;
