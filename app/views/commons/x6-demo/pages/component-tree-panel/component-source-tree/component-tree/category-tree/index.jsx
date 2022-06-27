import useModel from '@app/views/commons/x6-demo/models';
import {Tree} from 'antd';
import {FolderFilled, FolderOpenFilled} from '@ant-design/icons';
import {traverItem} from '@huxy/utils';
import {NodeTitle} from './node-title';
import styles from './index.less';
const {DirectoryTree} = Tree;
const FolderIcon = ({expanded}) => {
  return expanded ? <FolderOpenFilled /> : <FolderFilled />;
};
export const CategoryTree = () => {
  const {searchKey = '', componentTreeNodes} = useModel('guide-algo-component');
  /* const renderTree = useCallback((treeList = [], searchKey = '') => {
    return treeList.map((item) => {
      const { isDir, id, children } = item;
      const key = id.toString();
      const title = <NodeTitle node={item} searchKey={searchKey}/>;
      if (isDir) {
        return (<TreeNode icon={FolderIcon} key={key} title={title} className={styles.treeFolder}>
          {renderTree(children, searchKey)}
        </TreeNode>);
      }
      return (<TreeNode isLeaf={true} key={key} icon={<span />} title={title} className={styles.treeNode}/>);
    });
  }, []); */
  const treeList = componentTreeNodes.filter((node) => node.status !== 4);
  const treeData = traverItem((item) => {
    const {isDir, id} = item;
    item.key = id.toString();
    item.title = <NodeTitle node={item} searchKey={searchKey} />;
    if (isDir) {
      item.icon = FolderIcon;
      item.className = styles.treeFolder;
    } else {
      item.icon = <span />;
      item.className = styles.treeNode;
      item.isLeaf = true;
    }
    return item;
  })(treeList);
  return (
    <div className={styles.list}>
      <DirectoryTree showIcon={true} selectable={false} autoExpandParent={true} className={styles.tree} defaultExpandedKeys={['recentlyUsed']} treeData={treeData} />
    </div>
  );
};
