import {useState, useCallback, useEffect} from 'react';

import {Tree, Button, Input} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {Row, Col} from '@huxy/components';
import {isValidArr, traverItem, message} from '@huxy/utils';
import {useSearch, useDebounce} from '@huxy/use';

import Back from '@app/components/goBack';
import Panel from '@app/components/panel';
import {useIntls} from '@app/components/intl';

import formatTree from '@app/utils/formatTree';

import {routersStore} from '@app/store/stores';

import apiList from '@app/apis/apiList';

const {listAuthFn, setAuthFn} = apiList;

const {Search} = Input;

const rootNode = {
  path: '',
  icon: 'LayoutOutlined',
};

const Index = props => {
  const getIntls = useIntls();
  const authFormText = getIntls('main.users.authFormText', {});

  const routerList = routersStore.getState();

  const {getState} = props.history;
  const {backState} = getState();

  const [checkedKeys, setCheckedKeys] = useState([]);

  const [filterTree, setFilterTree] = useSearch(null);

  const update = useCallback(async () => {
    const {
      code,
      result,
      message: msg,
    } = await listAuthFn({
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
    } = await setAuthFn({
      uid: props.params.id,
      authKeys: checkedKeys.filter(Boolean),
    });
    if (code === 200) {
      message.success(`${msg} ${authFormText.auth_msg}`);
      props.router.push(`/apps/users`);
      // update();
    }
  };

  const onCheck = checkedKeysValue => {
    setCheckedKeys(checkedKeysValue);
  };

  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };

  const tree = formatTree([rootNode, ...routerList]);

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
            <Search placeholder="搜索..." allowClear enterButton style={{maxWidth: '240px', marginBottom: '12px'}} /* onSearch={searchTree} */ onChange={e => searchChange(e, tree)} />
            <Tree showIcon defaultExpandAll switcherIcon={<DownOutlined />} titleRender={item => item.name} treeData={treeData} virtual={false} checkable onCheck={onCheck} checkedKeys={leafKeys} />
            <div style={{padding: '12px 16px'}}>
              <Button type="primary" htmlType="submit" onClick={e => handleAuth()}>
                {authFormText.submit}
              </Button>
              <Button style={{marginLeft: '12px'}} onClick={() => setCheckedKeys([])}>
                {authFormText.reset}
              </Button>
            </div>
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
