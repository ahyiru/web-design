import {useState, useCallback} from 'react';

import useSearch from 'ihuxy-use/useSearch';
import traverItem from 'ihuxy-utils/traverItem';
import {arr2TreeByPath} from 'ihuxy-utils/arr2Tree';
import isValidArr from 'ihuxy-utils/isValidArr';

import {Tree, Modal, Form, Dropdown, Menu, message, Input, Spin} from 'antd';

import {DownOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, EyeInvisibleOutlined, LayoutOutlined} from '@ant-design/icons';

import * as Icons from '@ant-design/icons';

import HandleModal from './modal';

import apiList from '@app/utils/getApis';

import useFetchList from '@app/utils/useFetchList';

const {listRouterFn, addRouterFn, editRouterFn, deleteRouterFn} = apiList;

const {TreeNode} = Tree;
const {Search} = Input;
const {confirm} = Modal;

const nodeStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  userSelect: 'none',
};

const rootNode = {
  path: '',
  name: '路由管理平台',
  iconKey: 'LayoutOutlined',
};

const handleClick = ({addFn, editFn, deleteFn}, item) => (
  <Menu>
    <Menu.Item onClick={() => addFn(item)}>
      <a>
        <PlusOutlined />
        <span style={{padding: '0 4px'}}>新增</span>
      </a>
    </Menu.Item>
    <Menu.Item onClick={() => editFn(item)}>
      <a>
        <EditOutlined />
        <span style={{padding: '0 4px'}}>编辑</span>
      </a>
    </Menu.Item>
    <Menu.Item onClick={() => deleteFn(item)}>
      <a>
        <DeleteOutlined />
        <span style={{padding: '0 4px'}}>删除</span>
      </a>
    </Menu.Item>
  </Menu>
);

const treeDrop = (item, dropFns) => (
  <Dropdown overlay={() => handleClick(dropFns, item)} trigger={['contextMenu']}>
    <span style={nodeStyle}>{item.name}</span>
  </Dropdown>
);

const renderTree = (data, dropFns, childKey = 'children') =>
  data.map((item) => {
    const {path, name, icon: Icon, [childKey]: children} = item;
    if (children?.length) {
      return (
        <TreeNode key={path} title={treeDrop(item, dropFns)} icon={<Icon />} item={item}>
          {renderTree(children, dropFns, childKey)}
        </TreeNode>
      );
    }
    return <TreeNode key={path} title={treeDrop(item, dropFns)} icon={<Icon />} item={item} />;
  });

const Index = (props) => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [item, setItem] = useState({});
  const [filterTree, setFilterTree] = useSearch(null);

  const [result, update] = useFetchList(listRouterFn);

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
      title: '确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: `path: ${paths.join()}`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
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
    const {code, message: msg} = await handleFn(value);
    if (code === 200) {
      message.success(msg);
      setVisible(false);
      update();
    }
  };

  const dropFns = {
    addFn,
    editFn,
    deleteFn,
  };
  const {isPending, data} = result;
  const arr = [rootNode, ...(data || [])].map((item) => {
    item.key = item.path;
    const Icon = Icons[item.iconKey] || EyeInvisibleOutlined;
    item.icon = <Icon />;
    return item;
  });

  const tree = traverItem((item) => {
    if (!isValidArr(item.children)) {
      item.isLeaf = true;
    }
  })(arr2TreeByPath(arr));

  const treeData = filterTree || tree;
  return (
    <div className="page-style" style={{'--pageLeftWidth': '100%'}}>
      <div className="page-left">
        <Search placeholder="请输入名称" allowClear enterButton onSearch={searchTree} style={{maxWidth: '240px', marginBottom: 12}} />
        <Spin spinning={isPending}>
          <Tree showIcon defaultExpandAll switcherIcon={<DownOutlined />} titleRender={(item) => treeDrop(item, dropFns)} treeData={treeData} virtual={false} />
        </Spin>
      </div>
      {visible && <HandleModal onModalOk={onModalOk} onModalCancel={() => setVisible(false)} modalVisible={visible} type={modalType} item={item} isRoot={!data?.length} />}
    </div>
  );
};

export default Index;
