import {useState, useCallback, useEffect} from 'react';

import {Tree, Button, message, Input, Spin} from 'antd';

import {DownOutlined, EyeInvisibleOutlined} from '@ant-design/icons';

import {Row, Col} from '@huxy/components';
import {arr2TreeByPath, isValidArr, traverItem} from '@huxy/utils';
import {useSearch, useDebounce} from '@huxy/use';

import useFetchList from '@app/hooks/useFetchList';

import Back from '@app/components/goBack';

import Panel from '@app/components/panel';

import Icons from '@app/utils/icons';

import {useIntls} from '@app/components/intl';

import {defProject} from '@app/configs';

import {getRouter, getAuthedRouter, setAuthedRouter} from './mock';

const {Search} = Input;

const rootNode = {
  path: '',
  iconKey: 'LayoutOutlined',
};

const Index = props => {
  const getIntls = useIntls();
  const {getState} = props.history;
  const {backState} = getState();

  const [checkedKeys, setCheckedKeys] = useState([]);

  const [filterTree, setFilterTree] = useSearch(null);

  const [routerList] = useFetchList(getRouter, {projectId: defProject._id}, ({result}) => {
    const arr = [{...rootNode, name: getIntls('main.layout.users.authFormText.root_name')}, ...(result || [])].map(item => {
      item.key = item.path;
      const Icon = Icons[item.iconKey] || EyeInvisibleOutlined;
      item.icon = <Icon />;
      return item;
    });
    return {result: arr2TreeByPath(arr)};
  });

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

  // const searchTree = (value) => setFilterTree(tree, value, 'name', 'path');

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
      message.success(`${msg} ${getIntls('main.layout.users.authFormText.auth_msg')}`);
      props.router.push(`/playground/configTable`);
    }
  };

  const onCheck = checkedKeysValue => {
    setCheckedKeys(checkedKeysValue);
  };

  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };

  const {pending, data} = routerList;
  const treeData = filterTree || data || [];
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
                  {getIntls('main.layout.users.authFormText.submit')}
                </Button>
                <Button style={{marginLeft: '12px'}} onClick={() => setCheckedKeys([])}>
                  {getIntls('main.layout.users.authFormText.reset')}
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
