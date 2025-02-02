import {useState, useEffect} from 'react';
import {Tree, App, Dropdown, Menu, Spin} from 'antd';
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

const defaultForm = {
  key: '0',
  type: 'Form',
};

const formData = data => (Array.isArray(data) ? data : data ? [data] : [defaultForm]);

const Index = ({data, getValues, actionsText, addFormText, editorI18n}) => {
  const {modal} = App.useApp();
  const [open, setOpen] = useState(false);
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
    setOpen(true);
    setModalType('add');
  };
  const editFn = item => {
    setOpen(true);
    setModalType('edit');
  };
  const deleteFn = item => {
    modal.confirm({
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
                // showIcon
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
      {open && <HandleModal onModalOk={onModalOk} onModalCancel={() => setOpen(false)} modalOpen={open} type={modalType} item={item} addFormText={addFormText} />}
    </div>
  );
};

export default Index;
