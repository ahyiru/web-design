import {useState, useCallback, useEffect} from 'react';
import {Tree, Modal, Dropdown, Menu, message, Input, Spin, Button, Alert} from 'antd';
import {DownOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {traverItem, sort} from '@huxy/utils';
import {useSearch} from '@huxy/use';
import useFetchList from '@app/hooks/useFetchList';
import formatTree from '@app/utils/formatTree';
import Back from '@app/components/goBack';
import Panel from '@app/components/panel';
import customRender from '@app/utils/render';
import {userInfoStore} from '@app/store/stores';
import {useIntls} from '@app/components/intl';
import apiList from '@app/utils/getApis';
import {defProject} from '@app/configs';
import HandleModal from './modal';

const {listRouterFn, addRouterFn, editRouterFn, deleteRouterFn, listSchemaFn} = apiList;
const {Search} = Input;

const handleClick = ({addFn, editFn, deleteFn}, item, actionsText) => (
  <Menu>
    <Menu.Item onClick={() => addFn(item)}>
      <a>
        <PlusOutlined />
        <span style={{padding: '0 4px'}}>{actionsText.add_action}</span>
      </a>
    </Menu.Item>
    {!item.isRoot && (
      <>
        <Menu.Item onClick={() => editFn(item)}>
          <a>
            <EditOutlined />
            <span style={{padding: '0 4px'}}>{actionsText.edit_action}</span>
          </a>
        </Menu.Item>
        <Menu.Item onClick={() => deleteFn(item)}>
          <a>
            <DeleteOutlined />
            <span style={{padding: '0 4px'}}>{actionsText.delete_action}</span>
          </a>
        </Menu.Item>
      </>
    )}
  </Menu>
);

const treeDrop = (item, dropFns, actionsText) => (
  <Dropdown overlay={() => handleClick(dropFns, item, actionsText)} trigger={['contextMenu']}>
    <span className="node-style">{item.name}</span>
  </Dropdown>
);

const defSelectedItem = {
  key: '/low-code/dom',
  name: '原生dom',
  path: '/low-code/dom',
  projectId: defProject._id,
  _id: '60f842f05ce53002d3bd35d7',
};

const Index = props => {
  const getIntls = useIntls();
  const pageText = getIntls('main.projectRouter.pageText', {});
  const actionsText = getIntls('main.projectRouter.actionsText', {});
  const profile = userInfoStore.getState();

  const pageParams = props.params;
  const backState = props.history.getState()?.backState;
  const selItem = props.history.getState()?.item;
  const stateItem = selItem || (profile.projectId ? {_id: profile.projectId, name: profile.projectName, isDef: true} : defProject);
  const rootNode = {
    key: -1,
    path: '',
    name: stateItem.name,
    iconKey: 'LayoutOutlined',
    isRoot: true,
  };
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [item, setItem] = useState({});
  const [filterTree, setFilterTree] = useSearch(null);
  const [selectedItem, setSelectedItem] = useState(pageParams?.projectId ? {...defSelectedItem, ...pageParams} : defSelectedItem);
  const [pageSchema, setPageSchema] = useState([]);
  const [result, update] = useFetchList(listRouterFn, {projectId: stateItem._id});

  const searchTree = value => setFilterTree(tree, value, 'name', 'path');

  const addFn = item => {
    setOpen(true);
    setModalType('add');
    setItem({...item, parentId: item.path});
  };
  const editFn = item => {
    setOpen(true);
    setModalType('edit');
    const {icon, children, key, ...rest} = item;
    setItem(rest);
  };
  const deleteFn = item => {
    const paths = [];
    traverItem(v => {
      paths.push(v.path);
    })([item]);
    Modal.confirm({
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
          update();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const onModalOk = async value => {
    const handleFn = modalType === 'edit' ? editRouterFn : addRouterFn;
    const {code, message: msg} = await handleFn({...value, projectId: stateItem._id});
    if (code === 200) {
      message.success(msg);
      setOpen(false);
      update();
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
    const item = e.selectedNodes[0];
    if (item.parentId === '/low-code') {
      setSelectedItem(item);
    }
    // getPageSchema(item._id,item.projectId);
  };

  const toDesignPage = () => {
    const {_id, path, name, iconKey, projectId, key} = selectedItem;
    const itemState = {_id, path, name, iconKey, projectId, key, pageSchema};
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
  const {isPending, data} = result;

  const tree = formatTree([rootNode, ...sort(data, 'createtime', true)]);
  const treeData = filterTree || tree || [];

  return (
    <div>
      <Row>
        {!stateItem.isDef && (
          <Col>
            <Back back={back} />
          </Col>
        )}
        <Col width="260px">
          <Panel>
            <Spin spinning={isPending}>
              <Alert message="提供路由增删改查操作。暂时只有‘低代码’路由下的页面提供设计操作！" type="warning" showIcon closable style={{marginBottom: 10}} />
              <Search placeholder={pageText.search_placeholder} allowClear enterButton onSearch={searchTree} style={{maxWidth: '240px', marginBottom: 12}} />
              {!isPending && (
                <Tree
                  showIcon
                  defaultExpandedKeys={[selectedItem?.key || -1]}
                  switcherIcon={<DownOutlined />}
                  titleRender={item => treeDrop(item, dropFns, actionsText)}
                  treeData={treeData}
                  onSelect={onSelect}
                  selectedKeys={[selectedItem?.key || '']}
                  virtual={false}
                />
              )}
            </Spin>
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
      {open && <HandleModal onModalOk={onModalOk} onModalCancel={() => setOpen(false)} modalOpen={open} type={modalType} item={item} isRoot={!data?.length} />}
    </div>
  );
};

export default Index;
