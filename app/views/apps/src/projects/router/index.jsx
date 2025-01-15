import {useState, useCallback, useEffect} from 'react';
import {Tree, App, Dropdown, Input, Button, Alert} from 'antd';
import {DownOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {traverItem, message} from '@huxy/utils';
import {useSearch} from '@huxy/use';
import formatTree from '@app/utils/formatTree';
import Back from '@app/components/goBack';
import Panel from '@app/components/panel';
import customRender from '@app/utils/render';
import {userInfoStore, routersStore} from '@app/store/stores';
import {useIntls} from '@app/components/intl';
import apiList from '@app/apis/apiList';
import {defProject} from '@app/configs';
import HandleModal from './modal';

const {addRouterFn, editRouterFn, deleteRouterFn, listSchemaFn} = apiList;
const {Search} = Input;

const handleClick = (actions, item, actionsText) => ({
  onClick: action => actions[`${action.key}Fn`](item),
  items: [
    {
      key: 'add',
      icon: <PlusOutlined />,
      label: <span style={{padding: '0 4px'}}>{actionsText.add_action}</span>,
    },
    ...(item.isRoot
      ? []
      : [
          {
            key: 'edit',
            icon: <EditOutlined />,
            label: <span style={{padding: '0 4px'}}>{actionsText.edit_action}</span>,
          },
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: <span style={{padding: '0 4px'}}>{actionsText.delete_action}</span>,
          },
        ]),
  ],
});

const treeDrop = (item, dropFns, actionsText) => (
  <Dropdown menu={handleClick(dropFns, item, actionsText)} trigger={['contextMenu']}>
    <span className="custom-tree-node">
      <span className="node-icon">{item.icon}</span>
      <span className="node-style">{item.name}</span>
    </span>
  </Dropdown>
);

const defSelectedItem = {
  key: '/low-code/dom',
  name: '原生dom',
  path: '/low-code/dom',
  projectId: defProject._id,
  _id: '64827d9a0c54fc89e3a14b81',
};

const Index = props => {
  const {modal} = App.useApp();
  const getIntls = useIntls();
  const pageText = getIntls('main.projectRouter.pageText', {});
  const actionsText = getIntls('main.projectRouter.actionsText', {});
  const profile = userInfoStore.getState();

  const routerList = routersStore.getState();

  const pageParams = props.params;
  const backState = props.history.getState()?.backState;
  const selItem = props.history.getState()?.item;
  const stateItem = selItem || (profile.projectId ? {_id: profile.projectId, name: profile.projectName, isDef: true} : defProject);
  const rootNode = {
    key: -1,
    path: '',
    name: stateItem.name,
    icon: 'LayoutOutlined',
    isRoot: true,
  };
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [item, setItem] = useState({});
  const [filterTree, setFilterTree] = useSearch(null);
  const [selectedItem, setSelectedItem] = useState(pageParams?.projectId ? {...defSelectedItem, ...pageParams} : defSelectedItem);
  const [pageSchema, setPageSchema] = useState([]);

  const refresh = () => {
    window.location.reload();
  };

  const searchTree = value => setFilterTree(tree, value, 'name', 'path');

  const addFn = item => {
    setOpen(true);
    setModalType('add');
    setItem({...item, parentId: item.path});
  };
  const editFn = item => {
    setOpen(true);
    setModalType('edit');
    const {icon, iconKey, children, key, ...rest} = item;
    setItem({...rest, icon: iconKey});
  };
  const deleteFn = item => {
    const paths = [];
    traverItem(v => {
      paths.push(v.path);
    })([item]);
    modal.confirm({
      title: actionsText.delete_confirm,
      icon: <ExclamationCircleOutlined />,
      content: `path: ${paths.join()}`,
      okText: actionsText.delete_confirm_ok,
      okType: 'danger',
      cancelText: actionsText.delete_confirm_cancel,
      onOk: async () => {
        const {code, message: msg} = await deleteRouterFn({_id: item._id});
        if (code === 200) {
          message.success(msg);
          refresh();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const onModalOk = async values => {
    const handleFn = modalType === 'edit' ? editRouterFn : addRouterFn;
    const {code, message: msg} = await handleFn({...values, projectId: stateItem._id});
    if (code === 200) {
      message.success(msg);
      setOpen(false);
      refresh();
    }
  };

  const getPageSchema = useCallback(async (routerId, projectId) => {
    const {code, message: msg, result} = await listSchemaFn({routerId, projectId});
    if (code === 200) {
      setPageSchema(result || []);
    }
  }, []);

  useEffect(() => {
    const {_id, projectId} = selectedItem;
    if (_id) {
      getPageSchema(_id, projectId);
    }
  }, [selectedItem]);

  const onSelect = (selectedKeys, e) => {
    const item = e.node; //selectedNodes[0];
    if (item.component === '/lowcode/src/index.jsx') {
      setSelectedItem(item);
    }
    // getPageSchema(item._id,item.projectId);
  };

  const toDesignPage = () => {
    const {_id, path, name, icon, iconKey, projectId, key} = selectedItem;
    const itemState = {_id, path, name, icon: iconKey, projectId, key, pageSchema};
    props.router.push({
      path: `./${_id}`,
      state: {item: itemState, backState: {path: props.path, params: itemState, state: {item: selItem, backState}}},
    });
  };

  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };

  const dropFns = {
    addFn,
    editFn,
    deleteFn,
  };

  // const tree = formatTree([rootNode, ...sort(routerList, 'createtime', true)]);
  const tree = formatTree([rootNode, ...routerList]);
  const treeData = filterTree || tree || [];

  return (
    <div>
      <Row>
        {!stateItem.isDef && (
          <Col>
            <Back back={back} />
          </Col>
        )}
        <Col>
          <Alert message="右键路由菜单树可进行增删改操作。只有通过页面设计生成的路由页面才能进行重新设计操作！如‘低代码’路由" type="warning" showIcon closable style={{marginBottom: 10}} />
        </Col>
        <Col width="260px">
          <Panel>
            <Search placeholder={pageText.search_placeholder} allowClear enterButton onSearch={searchTree} style={{maxWidth: '240px', marginBottom: 12}} />
            <Tree
              // showIcon
              defaultExpandedKeys={[selectedItem?.key || -1]}
              switcherIcon={<DownOutlined />}
              titleRender={item => treeDrop(item, dropFns, actionsText)}
              treeData={treeData}
              onSelect={onSelect}
              selectedKeys={[selectedItem?.key || '']}
              virtual={false}
            />
          </Panel>
        </Col>
        <Col auto offsetWidth="260px">
          <Panel>
            <div style={{display: 'flex', marginBottom: 10}}>
              <h4 style={{flex: 'auto', margin: 0, lineHeight: '24px'}}>{pageText.preview_text}</h4>
              <Button type="primary" disabled={!selectedItem?._id} size="small" icon={<EditOutlined />} onClick={e => toDesignPage()}>
                {pageText.design_text}
              </Button>
            </div>
            <div style={{border: '1px solid rgba(255,255,255,.2)'}}>{customRender(pageSchema, {}, props)}</div>
          </Panel>
        </Col>
      </Row>
      {open && <HandleModal onModalOk={onModalOk} onModalCancel={() => setOpen(false)} modalOpen={open} type={modalType} item={item} isRoot={!routerList?.length} />}
    </div>
  );
};

export default Index;
