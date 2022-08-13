import {useState, useEffect} from 'react';
import {Tree, Modal, Dropdown, Menu, Spin} from 'antd';
import {DownOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

import {Row, Col} from '@huxy/components';
import {updateId, addNodes, editNodes, deleteNodes, selectedHandle} from '@huxy/utils';

import Panel from '@app/components/panel';

import HandleModal from './modal';

import CommonEditor from './commonEditor';

const getSelected = (data, id) => {
  let selected = {};
  selectedHandle((data, i) => {
    selected = data[i];
  })(data, id, 'key');
  return selected;
};

const handleClick = ({addFn, editFn, deleteFn}, item, actionsText) => (
  <Menu>
    <Menu.Item key="add" onClick={() => addFn(item)}>
      <a>
        <PlusOutlined />
        <span style={{padding: '0 4px'}}>{actionsText.add_action}</span>
      </a>
    </Menu.Item>
    {!item.isRoot && (
      <Menu.Item key="delete" onClick={() => deleteFn(item)}>
        <a>
          <DeleteOutlined />
          <span style={{padding: '0 4px'}}>{actionsText.delete_action}</span>
        </a>
      </Menu.Item>
    )}
  </Menu>
);

const treeDrop = (item, dropFns, actionsText) => (
  <Dropdown overlay={() => handleClick(dropFns, item, actionsText)} trigger={['contextMenu']}>
    <span className="node-style">{item.type}</span>
  </Dropdown>
);

const formData = data => (Array.isArray(data) ? data : data ? [data] : [{}]);

const Index = ({data, getValues, actionsText, editorI18n}) => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedKey, setSelectedKey] = useState('');
  // const [selectedItem,setSelectedItem]=useState({});

  const [schema, setSchema] = useState(formData(data));

  useEffect(() => {
    setSchema([...formData(data)]);
  }, [data]);

  const schemaTree = updateId(schema, 'key');
  /* const schemaTree=traverItem(item=>{
    if(typeof item.children==='string'){
      item.children=undefined;
    }
  })(updateId(schema,'key')); */

  const addFn = item => {
    setVisible(true);
    setModalType('add');
  };
  const editFn = item => {
    setVisible(true);
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
        getValues?.(tree);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const onModalOk = values => {
    const tree = addNodes(schemaTree, selectedKey, [values], 'key');
    setSchema([...tree]);
    getValues?.(tree);
  };

  const editProps = values => {
    const tree = editNodes(schemaTree, selectedKey, {props: values}, 'key');
    setSchema([...tree]);
    getValues?.({schema: tree[0]});
  };

  const onSelect = (selectedKeys, e) => {
    setSelectedKey(e.node.key);
  };

  /* const onDrop=info=>{
    const fromId=info.dragNode.key;
    const toId=info.node.key;
    const dropPosition=info.dropPosition;
    const tree=moveNodes(schemaTree,fromId,toId,dropPosition,'key');
    setSchema(tree);
    getValues?.(tree);
  }; */

  const dropFns = {
    addFn,
    editFn,
    deleteFn,
  };

  const item = getSelected(schemaTree, selectedKey);

  return (
    <div>
      <Row>
        <Col width="240px">
          <Panel>
            <Spin spinning={false}>
              <Tree
                showIcon
                defaultExpandAll
                switcherIcon={<DownOutlined />}
                titleRender={item => treeDrop(item, dropFns, actionsText)}
                treeData={schemaTree}
                onSelect={onSelect}
                virtual={false}
                // draggable
                // onDrop={onDrop}
              />
            </Spin>
          </Panel>
        </Col>
        <Col auto>
          <Panel>
            <CommonEditor getValues={editProps} data={item?.props} selectedKey={item?.key} editorI18n={editorI18n} />
          </Panel>
        </Col>
      </Row>
      {visible && <HandleModal onModalOk={onModalOk} onModalCancel={() => setVisible(false)} modalVisible={visible} type={modalType} item={item} />}
    </div>
  );
};

export default Index;
