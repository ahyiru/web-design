import {useState, useCallback} from 'react';
import {Input, Button, message} from 'antd';
import {Spinner, str2React} from '@huxy/components';
import {TextLoading} from '@huxy/materials';
import fetch from '@app/apis/fetcher';
import {Row, Col} from '@app/components/row';
import report from '@app/apis/report/report';
import marked from '@app/views/playground/src/md2html/renderContext/marked';
import './index.less';

const Index = props => {
  const [value, setValue] = useState('');
  const [context, setContext] = useState('试试与 ChatGPT 交流吧！');
  const getChat = useCallback(async value => {
    if (!value) {
      message.warning('请输入内容！');
      return;
    }
    setContext('');
    try{
      const {text} = await fetch({
        method: 'post',
        url: '/chatgpt/conversation', 
        data: {value},
      });
      report({
        actionType: 'chatGPT',
        category: 'chatGPT',
        text: value,
        value: text,
      });
      setContext(marked.parse(text) || 'No response');
    }catch(error) {
      setContext(`<div style="color: var(--red2)">error: ${error.message}</div>`);
    }
  }, []);
  return (
    <div className="chatgpt-page-container">
      <Row>
        <Col span={4}>
          <div className="chatgpt-input-area">
            <Input.TextArea allowClear autoSize={{minRows: 4}} placeholder="请输入内容" value={value} onChange={e => setValue(e.target.value)} />
            <Button loading={context === ''} type="primary" onClick={e => getChat(value)} style={{marginTop: '20px'}}>提交</Button>
          </div>
        </Col>
        <Col span={8}>
          <div className="chatgpt-output-area">
            <div className="output-context">{str2React(context)}</div>
            {context === '' ? <>
              <Spinner global />
              <div style={{padding: '30px 0', textAlign: 'center'}}>
                <TextLoading style={{fontSize: '2rem'}}>正在从 OpenAI 获取数据，请耐心等待...</TextLoading>
              </div>
            </> : null}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
