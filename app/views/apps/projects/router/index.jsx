import {useState, useCallback, useEffect} from 'react';
import {Tree, Modal, Dropdown, Menu, message, Input, Spin, Button} from 'antd';
import {DownOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {traverItem, sort} from '@huxy/utils';
import {useSearch} from '@huxy/use';
import apiList from '@app/utils/getApis';
import defProject from '@app/configs/projects';
import useFetchList from '@app/hooks/useFetchList';
import formatTree from '@app/utils/formatTree';
import Back from '@app/components/goBack';
import Panel from '@app/components/panel';
import customRender from '@app/utils/render';
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

const Index = (props) => {
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.main?.projectRouter ?? {};
  const {pageText = {}, actionsText = {}} = i18nCfg;

  const profile = props.store.getState('profile');
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
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [item, setItem] = useState({});
  const [filterTree, setFilterTree] = useSearch(null);
  const [selectedItem, setSelectedItem] = useState(pageParams || {});
  const [pageSchema, setPageSchema] = useState([]);
  const [result, update] = useFetchList(listRouterFn, {projectId: stateItem._id});

  const searchTree = (value) => setFilterTree(tree, value, 'name', 'path');

  const addFn = (item) => {
    setVisible(true);
    setModalType('add');
    setItem({...item, parentId: item.path});
  };
  const editFn = (item) => {
    setVisible(true);
    setModalType('edit');
    const {icon, children, key, ...rest} = item;
    setItem(rest);
  };
  const deleteFn = (item) => {
    const paths = [];
    traverItem((v) => {
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
  const onModalOk = async (value) => {
    const handleFn = modalType === 'edit' ? editRouterFn : addRouterFn;
    const {code, message: msg} = await handleFn({...value, projectId: stateItem._id});
    if (code === 200) {
      message.success(msg);
      setVisible(false);
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
    setSelectedItem(item);
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
        <Col width="240px">
          <Panel>
            <Spin spinning={isPending}>
              <Search placeholder={pageText.search_placeholder} allowClear enterButton onSearch={searchTree} style={{maxWidth: '240px', marginBottom: 12}} />
              {!isPending && (
                <Tree
                  showIcon
                  defaultExpandedKeys={[selectedItem?.key || -1]}
                  switcherIcon={<DownOutlined />}
                  titleRender={(item) => treeDrop(item, dropFns, actionsText)}
                  treeData={treeData}
                  onSelect={onSelect}
                  selectedKeys={[selectedItem?.key || '']}
                  virtual={false}
                />
              )}
            </Spin>
          </Panel>
        </Col>
        <Col auto offsetWidth="240px">
          <Panel>
            <div style={{display: 'flex', marginBottom: 10}}>
              <h4 style={{flex: 'auto', margin: 0, lineHeight: '24px'}}>{pageText.preview_text}</h4>
              <Button type="primary" disabled={!selectedItem?._id} size="small" icon={<EditOutlined />} onClick={(e) => toDesignPage()}>
                {pageText.design_text}
              </Button>
            </div>
            <div style={{border: '1px solid rgba(255,255,255,.2)'}}>{customRender(pageSchema, {}, props)}</div>
          </Panel>
        </Col>
      </Row>
      {visible && <HandleModal onModalOk={onModalOk} onModalCancel={() => setVisible(false)} modalVisible={visible} type={modalType} item={item} isRoot={!data?.length} store={props.store} />}
    </div>
  );
};

export default Index;
