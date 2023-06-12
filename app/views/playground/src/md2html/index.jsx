import {Link} from '@huxy/router';
import {Md2html} from '@huxy/components';
import marked from '@app/utils/marked';
import {getContext, listFiles} from './configs';

const configs = {
  Link,
  marked,
  getContext,
  listFiles,
  title: '文档系统',
};

const Index = props => <Md2html router={props.router} params={props.params} {...configs} />;

export default Index;
