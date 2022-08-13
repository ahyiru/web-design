import {useCallback} from 'react';
import {Popover, ConfigProvider} from 'antd';
import {MinusSquareOutlined, PlusSquareOutlined} from '@ant-design/icons';
import {ANT_PREFIX} from '@app/views/commons/x6-demo/constants/global';
import {calcNodeScale} from '@app/views/commons/x6-demo/pages/rx-models/graph-util';
import {useExperimentGraph} from '@app/views/commons/x6-demo/pages/rx-models/experiment-graph';
import {X6DemoGroupNode} from '@app/views/commons/x6-demo/pages/common/graph-common/shape/node';
import {X6DemoGroupEdge} from '../../common/graph-common/shape/edge';
import styles from './node-group.less';
export const NodeGroup = props => {
  const {experimentId, node} = props;
  const data = node.getData();
  const {name, isCollapsed = false} = data;
  const experimentGraph = useExperimentGraph(experimentId);
  const onCollapseGroup = useCallback(() => {
    const {graph} = experimentGraph;
    const children = node.getDescendants();
    const childNodes = children.filter(child => child.isNode());
    const {x, y, width, height} = calcNodeScale(
      {isCollapsed: true},
      childNodes.map(i => i.getData()),
    );
    node.setProp({
      position: {x, y},
      size: {width, height},
    });
    node?.updateData({isCollapsed: true});
    children.forEach(child => {
      child.hide();
      child.updateData({hide: true});
    });
    const groupEdges = graph?.getConnectedEdges(node);
    if (groupEdges?.length) {
      experimentGraph.deleteEdges(groupEdges);
    }
    const ports = node.getPorts();
    if (ports?.length) {
      node.removePorts(ports);
    }
    const incomingEdges = childNodes.reduce((accu, curr) => {
      const incomingEdgs = graph.getIncomingEdges(curr);
      if (incomingEdgs?.length) {
        return [...accu, ...incomingEdgs];
      }
      return accu;
    }, []);
    const outgoingEdges = childNodes.reduce((accu, curr) => {
      const outgoingEdgs = graph.getOutgoingEdges(curr);
      if (outgoingEdgs?.length) {
        return [...accu, ...outgoingEdgs];
      }
      return accu;
    }, []);
    if (incomingEdges?.length) {
      const inputPortId = Date.now().toString();
      node.addPort({group: 'in', id: inputPortId, connected: true});
      incomingEdges
        .filter(edge => !childNodes.map(i => i.id).includes(edge.getSourceCellId()))
        .forEach(edge => {
          let sourceNodeId = edge.getSourceCellId();
          let sourcePortId = edge.getSourcePortId();
          const sourceNode = edge.getSourceCell();
          if (sourceNode instanceof X6DemoGroupNode) {
            experimentGraph.deleteEdges(edge);
            return;
          }
          const sourceParentNode = sourceNode.parent;
          if (!sourceNode.visible && sourceParentNode instanceof X6DemoGroupNode) {
            sourceNodeId = sourceParentNode.id;
            const parentNodePorts = sourceParentNode.getPortsByGroup('out');
            sourcePortId = parentNodePorts[0].id;
          }
          graph.addEdge(
            new X6DemoGroupEdge({
              sourceAnchor: 'bottom',
              source: {
                cell: sourceNodeId,
                port: sourcePortId,
                anchor: {
                  name: 'bottom',
                },
              },
              target: {
                cell: node.id,
                port: inputPortId,
                anchor: {
                  name: 'center',
                },
              },
              zIndex: 1,
            }),
          );
        });
    }
    if (outgoingEdges?.length) {
      const outputPortId = Date.now().toString();
      node.addPort({group: 'out', id: outputPortId, connected: false});
      outgoingEdges
        .filter(edge => !childNodes.map(i => i.id).includes(edge.getTargetCellId()))
        .forEach(edge => {
          let targetNodeId = edge.getTargetCellId();
          let targetPortId = edge.getTargetPortId();
          const targetNode = edge.getTargetCell();
          if (targetNode instanceof X6DemoGroupNode) {
            experimentGraph.deleteEdges(edge);
            return;
          }
          const targetParentNode = targetNode.parent;
          if (!targetNode.visible && targetParentNode instanceof X6DemoGroupNode) {
            targetNodeId = targetParentNode.id;
            const parentNodePorts = targetParentNode.getPortsByGroup('in');
            targetPortId = parentNodePorts[0].id;
          }
          graph.addEdge(
            new X6DemoGroupEdge({
              sourceAnchor: 'bottom',
              source: {
                cell: node.id,
                port: outputPortId,
                anchor: {
                  name: 'bottom',
                },
              },
              target: {
                cell: targetNodeId,
                port: targetPortId,
                anchor: {
                  name: 'center',
                },
              },
              zIndex: 1,
            }),
          );
        });
    }
  }, [node, experimentGraph]);
  const onExpandGroup = useCallback(() => {
    const {graph} = experimentGraph;
    const children = node.getDescendants();
    const childNodes = children.filter(child => child.isNode());
    const {x, y, width, height} = calcNodeScale(
      {isCollapsed: false},
      children.filter(i => i.isNode()).map(i => i.getData()),
    );
    node.setProp({
      position: {x, y},
      size: {width, height},
    });
    const prevData = node.getData();
    node?.setData({...prevData, isCollapsed: false});
    childNodes.forEach(child => {
      child.show();
      child.updateData({hide: false});
    });
    const groupEdges = graph?.getConnectedEdges(node);
    if (groupEdges?.length) {
      experimentGraph.deleteEdges(groupEdges);
    }
    const ports = node.getPorts();
    if (ports?.length) {
      node.removePorts(ports);
    }
    const childIncomingEdges = childNodes.reduce((accu, curr) => {
      const incomingEdgs = graph.getIncomingEdges(curr);
      if (incomingEdgs?.length) {
        return [...accu, ...incomingEdgs];
      }
      return accu;
    }, []);
    const childOutgoingEdges = childNodes.reduce((accu, curr) => {
      const outgoingEdgs = graph.getOutgoingEdges(curr);
      if (outgoingEdgs?.length) {
        return [...accu, ...outgoingEdgs];
      }
      return accu;
    }, []);
    if (childIncomingEdges?.length) {
      childIncomingEdges
        .filter(edge => !childNodes.map(i => i.id).includes(edge.getSourceCellId()))
        .forEach(edge => {
          const sourceNode = edge.getSourceCell();
          if (sourceNode instanceof X6DemoGroupNode) {
            experimentGraph.deleteEdges(edge);
            return;
          }
          const sourceParentNode = sourceNode.parent;
          if (!sourceNode.visible && sourceParentNode instanceof X6DemoGroupNode) {
            const sourceNodeId = sourceParentNode.id;
            const parentNodePorts = sourceParentNode.getPortsByGroup('out');
            const sourcePortId = parentNodePorts[0].id;
            const targetNodeId = edge.getTargetCellId();
            const targetPortId = edge.getTargetPortId();
            graph.addEdge(
              new X6DemoGroupEdge({
                sourceAnchor: 'bottom',
                source: {
                  cell: sourceNodeId,
                  port: sourcePortId,
                  anchor: {
                    name: 'bottom',
                  },
                },
                target: {
                  cell: targetNodeId,
                  port: targetPortId,
                  anchor: {
                    name: 'center',
                  },
                },
                zIndex: 1,
              }),
            );
          }
        });
    }
    if (childOutgoingEdges?.length) {
      childOutgoingEdges
        .filter(edge => !childNodes.map(i => i.id).includes(edge.getTargetCellId()))
        .forEach(edge => {
          const targetNode = edge.getTargetCell();
          if (targetNode instanceof X6DemoGroupNode) {
            experimentGraph.deleteEdges(edge);
            return;
          }
          const targetParentNode = targetNode.parent;
          if (!targetNode.visible && targetParentNode instanceof X6DemoGroupNode) {
            const targetNodeId = targetParentNode.id;
            const parentNodePorts = targetParentNode.getPortsByGroup('in');
            const targetPortId = parentNodePorts[0].id;
            const sourceNodeId = edge.getSourceCellId();
            const sourcePortId = edge.getSourcePortId();
            graph.addEdge(
              new X6DemoGroupEdge({
                sourceAnchor: 'bottom',
                source: {
                  cell: sourceNodeId,
                  port: sourcePortId,
                  anchor: {
                    name: 'bottom',
                  },
                },
                target: {
                  cell: targetNodeId,
                  port: targetPortId,
                  anchor: {
                    name: 'center',
                  },
                },
                zIndex: 1,
              }),
            );
          }
        });
    }
  }, [node, experimentGraph]);
  return (
    <ConfigProvider prefixCls={ANT_PREFIX}>
      <div className={styles.nodeGroup}>
        <div className={styles.row}>
          <Popover content={`组名: ${name}`} overlayClassName={styles.namePopover}>
            <div className={styles.name}>{name.length > 20 ? `${name.slice(0, 20)}...` : name}</div>
          </Popover>
          {isCollapsed ? <PlusSquareOutlined className={styles.collapseButton} onClick={onExpandGroup} /> : <MinusSquareOutlined className={styles.collapseButton} onClick={onCollapseGroup} />}
        </div>
      </div>
    </ConfigProvider>
  );
};
