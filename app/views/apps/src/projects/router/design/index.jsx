import {useState, useEffect, useMemo} from 'react';
import {Tree, Modal, Dropdown, Spin, Alert} from 'antd';
import {DownOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {updateId, addNodes, editNodes, deleteNodes, moveNodes, cacheData, selectedHandle, session, message} from '@huxy/utils';
import Back from '@app/components/goBack';
import Panel from '@app/components/panel';
import {userInfoStore} from '@app/store/stores';
import {useIntls} from '@app/components/intl';
import apiList from '@app/apis/apiList';
import {defProject} from '@app/configs';

import HandleModal from './modal';
import CommonEditor from './commonEditor';
import FormEditor from './formEditor';
import TableEditor from './table';
// import indexSchema from '@app/20210720.bk/schema/indexSchema';
// import addSchema from '@app/20210720.bk/schema/addSchema';

const {setSchemaFn} = apiList;
const {record, undo, redo, clean} = cacheData();

const handleClick = (actions, item, actionsText) => ({
  onClick: action => actions[`${action.key}Fn`](item),
  items: [
    {
      key: 'add',
      icon: <PlusOutlined />,
      label: <span style={{padding: '0 4px'}}>{actionsText.add_action}</span>,
    },
    ...(item.key === '0'
      ? []
      : [
        /* {
        key: 'edit',
        icon: <EditOutlined />,
        label: <span style={{padding: '0 4px'}}>{actionsText.edit_action}</span>,
      }, */
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
      <span className="node-style">{item.type}</span>
    </span>
  </Dropdown>
);

const getSelected = (data, id) => {
  let selected = {};
  selectedHandle((data, i) => {
    selected = data[i];
  })(data, id, 'key');
  return selected;
};

const Index = props => {
  const getIntls = useIntls();
  const i18nCfg = getIntls('main.projectDesign', {});
  const {pageText = {}, actionsText = {}, topActionText = {}, addFormText = {}, designConfigText} = i18nCfg;
  const {editorI18n = {}} = designConfigText || {};

  const profile = userInfoStore.getState();
  const backState = props.history.getState()?.backState;
  const selItem = props.history.getState()?.item;
  const stateItem = selItem || (profile.projectId ? {_id: profile.projectId, name: profile.projectName, isDef: true} : defProject);
  const rootNode = {
    type: stateItem?.name,
    key: '0',
    // selectable: false,
  };
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedKey, setSelectedKey] = useState('0');
  // const [selectedItem,setSelectedItem]=useState({});
  const pageSchema = stateItem?.pageSchema ? (Array.isArray(stateItem.pageSchema) ? stateItem.pageSchema : [stateItem.pageSchema]) : [];

  const [schema, setSchema] = useState([{...rootNode, children: pageSchema}]);
  const [disableUndo, setDisableUndo] = useState(true);
  const [disableRedo, setDisableRedo] = useState(true);

  const schemaTree = updateId(schema, 'key');
  useEffect(() => {
    record(schemaTree);
    return () => clean();
  }, []);

  const addFn = item => {
    setOpen(true);
    setModalType('add');
  };
  const editFn = item => {
    setOpen(true);
    setModalType('edit');
  };
  const deleteFn = item => {
    Modal.confirm({
      title: actionsText.delete_confirm,
      icon: <ExclamationCircleOutlined />,
      content: `component: ${item.type}`,
      okText: actionsText.delete_confirm_ok,
      okType: 'danger',
      cancelText: actionsText.delete_confirm_cancel,
      onOk: () => {
        const tree = deleteNodes(schemaTree, item.key, 'key');
        setSchema([...tree]);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const onModalOk = values => {
    const tree = addNodes(schemaTree, selectedKey, [values], 'key');
    setSchema([...tree]);
  };

  const editProps = values => {
    const tree = editNodes(schemaTree, selectedKey, {props: values}, 'key');
    setSchema([...tree]);
    record(tree);
    setDisableUndo(false);
  };

  const onSelect = (selectedKeys, e) => {
    setSelectedKey(e.node.key);
  };

  const saveConfigs = async () => {
    const {routerId, projectId} = props.params || {};
    // console.log('pageSchema:',schemaTree);
    const schemas = schemaTree[0].children; //[indexSchema];[addSchema];
    const {code, message: msg} = await setSchemaFn({pageSchema: schemas, routerId, projectId});
    if (code === 200) {
      message.success(msg);
      back();
    }
  };
  const preview = () => {
    /* props.router.push({
      path:'./preview',
      state:schemaTree,
    }); */
    const {routerId, projectId} = props.params || {};

    const schemas = schemaTree[0].children;
    session.set(routerId, schemas);

    const {hash, origin} = location;
    const q = `?projectId=${projectId}&routerId=${routerId}`;
    const url = hash ? `${origin}/#/preview${q}` : `${origin}/preview${q}`;
    window.open(url);
  };

  const onDrop = info => {
    const fromId = info.dragNode.key;
    const toId = info.node.key;
    const dropPosition = info.dropPosition;
    const tree = moveNodes(schemaTree, fromId, toId, dropPosition, 'key');
    setSchema([...tree]);
  };

  const undoDesign = () => {
    const {index, data} = undo();
    setSchema(data);
    if (index === 0) {
      setDisableUndo(true);
    }
    setDisableRedo(false);
  };

  const redoDesign = () => {
    const {index, length, data} = redo();
    setSchema(data);
    if (index === length - 1) {
      setDisableRedo(true);
    }
    setDisableUndo(false);
  };

  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };

  const topActions = [
    {
      text: topActionText.preview,
      icon: 'EyeOutlined',
      type: 'primary',
      onClick: preview,
    },
    {
      text: topActionText.saveConfigs,
      icon: 'SaveOutlined',
      type: 'primary',
      onClick: saveConfigs,
    },
    {
      text: topActionText.redoDesign,
      icon: 'RedoOutlined',
      // type:'primary',
      onClick: redoDesign,
      disabled: disableRedo,
    },
    {
      text: topActionText.undoDesign,
      icon: 'UndoOutlined',
      // type:'primary',
      onClick: undoDesign,
      disabled: disableUndo,
    },
  ];

  const dropFns = {
    addFn,
    editFn,
    deleteFn,
  };

  const item = getSelected(schemaTree, selectedKey);

  const DefultComp = useMemo(
    () => (
      <Panel>
        <CommonEditor getValues={editProps} data={item?.props} title={pageText.page_title} selectedKey={item?.key} editorI18n={editorI18n} />
      </Panel>
    ),
    [item],
  );
  const CustomForm = useMemo(() => <FormEditor getValues={editProps} data={item?.props?.schema} actionsText={actionsText} editorI18n={editorI18n} addFormText={addFormText} />, [item]);
  const CustomTable = useMemo(() => <TableEditor getValues={editProps} data={item?.props} designConfigText={designConfigText} actionsText={actionsText} addFormText={addFormText} />, [item]);

  const CfgComp = {
    CustomForm,
    CustomTable,
  };
  const Comp = CfgComp[item?.type] ?? DefultComp;

  return (
    <div>
      <Row>
        {!stateItem.isDef && (
          <Col>
            <Back actions={topActions} back={back} />
          </Col>
        )}
        <Col width="260px">
          <Panel>
            <Spin spinning={false}>
              <Tree
                // showLine
                defaultExpandAll
                switcherIcon={<DownOutlined />}
                titleRender={item => treeDrop(item, dropFns, actionsText)}
                treeData={schemaTree}
                onSelect={onSelect}
                virtual={false}
                draggable
                onDrop={onDrop}
              />
            </Spin>
          </Panel>
        </Col>
        <Col auto offsetWidth="260px">
          <Panel>
            {selectedKey !== '0' ? (
              Comp
            ) : (
              <div>
                <Alert
                  type="warning"
                  showIcon
                  message="请选中左侧DOM树节点！"
                  description="请选中左侧DOM树节点，来对当前节点属性进行增删改操作，如添加属性‘style’、‘onClick’等。根节点不可设置属性！DOM树节点右键可添加或删除节点，节点可自由拖动！"
                />
              </div>
            )}
          </Panel>
        </Col>
      </Row>
      {open && <HandleModal onModalOk={onModalOk} onModalCancel={() => setOpen(false)} modalOpen={open} type={modalType} item={item} addFormText={addFormText} />}
    </div>
  );
};

export default Index;
