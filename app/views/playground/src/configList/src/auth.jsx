import {useState, useCallback, useEffect} from 'react';

import {Tree, Button, Input, Spin} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {Row, Col} from '@huxy/components';
import {isValidArr, traverItem, message} from '@huxy/utils';
import {useSearch, useDebounce} from '@huxy/use';

import useFetchList from '@app/hooks/useFetchList';

import Back from '@app/components/goBack';
import Panel from '@app/components/panel';
import {useIntls} from '@app/components/intl';

import formatTree from '@app/utils/formatTree';

import {defProject} from '@app/configs';

import {apiList} from '../configs';

const {getRouter, getAuthedRouter, setAuthedRouter} = apiList;

const {Search} = Input;

const rootNode = {
  path: '',
  icon: 'LayoutOutlined',
};

const Index = props => {
  const getIntls = useIntls();
  const authFormText = getIntls('main.users.authFormText', {});

  const {getState} = props.history;
  const {backState} = getState();

  const [checkedKeys, setCheckedKeys] = useState([]);

  const [filterTree, setFilterTree] = useSearch(null);

  const [routerList] = useFetchList(getRouter, {projectId: defProject.id});

  const update = useCallback(async () => {
    const {
      code,
      result,
      message: msg,
    } = await getAuthedRouter({
      uid: props.params.id,
    });
    if (code === 200) {
      setCheckedKeys(result || []);
    }
  }, []);

  useEffect(() => {
    update();
  }, []);

  const searchChange = useDebounce((e, data) => {
    const {value} = e.target;
    setFilterTree(data, value, 'name', 'path');
  }, 500);

  const handleAuth = async () => {
    const {
      code,
      result,
      message: msg,
    } = await setAuthedRouter({
      uid: props.params.id,
      authKeys: checkedKeys.filter(Boolean),
    });
    if (code === 200) {
      message.success(`${msg} ${authFormText.auth_msg}`);
      props.router.push(`/playground/configList`);
    }
  };

  const onCheck = checkedKeysValue => {
    setCheckedKeys(checkedKeysValue);
  };

  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };

  const {pending, data} = routerList;
  const tree = formatTree([{...rootNode, name: authFormText.root_name}, ...(data || [])]);
  const treeData = filterTree || tree || [];
  const nodes = [];
  traverItem(item => {
    if (isValidArr(item.children)) {
      nodes.push(item.path);
    }
  })(treeData);
  const leafKeys = checkedKeys.filter(v => !nodes.includes(v));

  return (
    <div>
      <Row>
        <Col>
          <Back back={back} />
        </Col>
        <Col>
          <Panel>
            <Spin spinning={pending}>
              <Search placeholder="搜索..." allowClear enterButton style={{maxWidth: '240px', marginBottom: '12px'}} /* onSearch={searchTree} */ onChange={e => searchChange(e, data)} />
              <Tree showIcon defaultExpandAll switcherIcon={<DownOutlined />} titleRender={item => item.name} treeData={treeData} virtual={false} checkable onCheck={onCheck} checkedKeys={leafKeys} />
              <div style={{padding: '12px 16px'}}>
                <Button type="primary" htmlType="submit" onClick={e => handleAuth()}>
                  {authFormText.submit}
                </Button>
                <Button style={{marginLeft: '12px'}} onClick={() => setCheckedKeys([])}>
                  {authFormText.reset}
                </Button>
              </div>
            </Spin>
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
