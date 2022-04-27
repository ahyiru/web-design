import {useState, useCallback, useEffect} from 'react';

import {Tree, Button, message} from 'antd';

import {DownOutlined, EyeInvisibleOutlined} from '@ant-design/icons';

import * as Icons from '@ant-design/icons';

import {Row,Col} from '@huxy/components';
import {arr2TreeByPath,isValidArr,traverItem} from '@huxy/utils';

import defProject from '@app/configs/projects';

import apiList from '@app/utils/getApis';

import useFetchList from '@app/hooks/useFetchList';

import Back from '@app/components/goBack';

import Panel from '@app/components/panel';

const {listRouterFn, listAuthFn, setAuthFn} = apiList;

const rootNode = {
  path: '',
  iconKey: 'LayoutOutlined',
};

const Index = (props) => {
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.main?.users ?? {};
  const {authFormText = {}} = i18nCfg;

  const {getState} = props.history;
  const {backState} = getState();

  const [checkedKeys, setCheckedKeys] = useState([]);

  const [routerList] = useFetchList(listRouterFn, {projectId: defProject._id});

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

  const handleAuth = async () => {
    console.log(checkedKeys);
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

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };

  const {isPending, data} = routerList;
  const arr = [{...rootNode, name: authFormText.root_name}, ...(data || [])].map((item) => {
    item.key = item.path;
    const Icon = Icons[item.iconKey] || EyeInvisibleOutlined;
    item.icon = <Icon />;
    return item;
  });
  const treeData = arr2TreeByPath(arr);
  const nodes = [];
  traverItem((item) => {
    if (isValidArr(item.children)) {
      nodes.push(item.path);
    }
  })(treeData);
  const leafKeys = checkedKeys.filter((v) => !nodes.includes(v));

  return (
    <div>
      <Row>
        <Col>
          <Back back={back} />
        </Col>
        <Col>
          <Panel>
            <Tree showIcon defaultExpandAll switcherIcon={<DownOutlined />} titleRender={(item) => item.name} treeData={treeData} virtual={false} checkable onCheck={onCheck} checkedKeys={leafKeys} />
            <div style={{padding: '12px 16px'}}>
              <Button type="primary" htmlType="submit" onClick={(e) => handleAuth()}>
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
