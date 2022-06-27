import {sort} from '@huxy/utils';
import {GROUP_HORIZONTAL__PADDING, GROUP_VERTICAL__PADDING, NODE_WIDTH, NODE_HEIGHT} from '@app/views/commons/x6-demo/constants/graph';

// import '../common/graph-common/connector';
import {Graph} from '@antv/x6';
Graph.registerConnector(
  'pai',
  (s, t) => {
    const offset = 4;
    const control = 80;
    const v1 = {x: s.x, y: s.y + offset + control};
    const v2 = {x: t.x, y: t.y - offset - control};
    return `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${t.x} ${t.y - offset}
       L ${t.x} ${t.y}
      `;
  },
  true,
);

export function expandGroupAccordingToNodes(params) {
  const {moveNodes} = params;
  const parentNodes = [];
  moveNodes.forEach((node) => {
    const parentNode = node.getParent();
    if (parentNode && !parentNodes.includes(parentNode)) {
      parentNodes.push(parentNode);
    }
  });
  parentNodes.forEach((parent) => {
    const originSize = parent.getSize();
    const originPosition = parent.getPosition();
    const originX = originPosition.x;
    const originY = originPosition.y;
    const originWidth = originSize.width;
    const originHeight = originSize.height;
    const children = parent.getChildren();
    const childNodes = children.filter((child) => child.isNode());
    if (childNodes?.length) {
      const positions = childNodes.map((childNode) => childNode.getPosition());
      const Xs = positions.map(({x}) => x);
      const Ys = positions.map(({y}) => y);
      const minX = Math.min(Xs);
      const minY = Math.min(Ys);
      const maxX = Math.max(Xs);
      const maxY = Math.max(Ys);
      const nextX = minX - GROUP_HORIZONTAL__PADDING;
      const nextY = minY - GROUP_VERTICAL__PADDING;
      const nextWidth = maxX - minX + 2 * GROUP_HORIZONTAL__PADDING + NODE_WIDTH;
      const nextHeight = maxY - minY + 2 * GROUP_VERTICAL__PADDING + NODE_HEIGHT;
      if (originX !== nextX || originY !== nextY || originWidth !== nextWidth || originHeight !== nextHeight) {
        parent.prop({
          position: {x: nextX, y: nextY},
          size: {width: nextWidth, height: nextHeight},
        });
      }
    }
  });
}
export function formatNodeInfoToNodeMeta(nodeData, inputPortConnectedMap = {}) {
  const portItems = [];
  const {id, nodeInstanceId, positionX, positionY, inPorts, outPorts} = nodeData;
  sort(inPorts, 'sequence').forEach((inPort) => {
    portItems.push({
      ...inPort,
      group: 'in',
      id: inPort.id.toString(),
      connected: !!inputPortConnectedMap[inPort.id.toString()],
    });
  });
  sort(outPorts, 'sequence').forEach((outPort) => {
    portItems.push({
      ...outPort,
      group: 'out',
      id: outPort.id.toString(),
      connected: !!inputPortConnectedMap[outPort.id.toString()],
    });
  });
  const x = positionX || 0;
  const y = positionY || 0;
  return {
    ...nodeData,
    x,
    y,
    type: 'node',
    id: (nodeInstanceId || id).toString(),
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    data: {
      ...nodeData,
      type: 'node',
      x,
      y,
      id: (nodeInstanceId || id).toString(),
    },
    ports: {
      items: portItems,
    },
    zIndex: 10,
  };
}
export function calcNodeScale(groupData, children) {
  const {isCollapsed = false} = groupData;
  const Xs = children.map(({x}) => x);
  const Ys = children.map(({y}) => y);
  const minX = Math.min(Xs);
  const minY = Math.min(Ys);
  const maxX = Math.max(Xs);
  const maxY = Math.max(Ys);
  const defaultX = minX - GROUP_HORIZONTAL__PADDING;
  const defaultY = minY - GROUP_VERTICAL__PADDING;
  const defaultWidth = maxX - minX + 2 * GROUP_HORIZONTAL__PADDING + NODE_WIDTH;
  if (isCollapsed) {
    return {
      x: defaultX + defaultWidth / 2 - NODE_WIDTH / 2,
      y: defaultY,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    };
  }
  return {
    x: defaultX,
    y: defaultY,
    width: defaultWidth,
    height: maxY - minY + 2 * GROUP_VERTICAL__PADDING + NODE_HEIGHT,
  };
}
export function formatGroupInfoToNodeMeta(groupData, nodeDatas, edges) {
  const {id, isCollapsed = false} = groupData;
  const includedNodes = nodeDatas.filter((nodeMeta) => nodeMeta.groupId.toString() === id.toString());
  const {x, y, width, height} = calcNodeScale(groupData, includedNodes);
  if (isCollapsed && edges) {
    includedNodes.forEach((node) => {
      node.data.hide = true;
    });
    const includedNodeIds = includedNodes.map((nodeData) => nodeData.id.toString());
    const edgesFromOutside = edges.filter((edge) => {
      const {source, target} = edge;
      return includedNodeIds.includes(target.cell.toString()) && !includedNodeIds.includes(source.cell.toString());
    });
    const edgesToOutside = edges.filter((edge) => {
      const {source, target} = edge;
      return includedNodeIds.includes(source.cell.toString()) && !includedNodeIds.includes(target.cell.toString());
    });
    const portItems = [];
    if (edgesFromOutside?.length) {
      const portId = Date.now().toString();
      portItems.push({group: 'in', id: portId, connected: true});
      edgesFromOutside.forEach((edge) => {
        const {source, outputPortId} = edge;
        edges.push({
          sourceAnchor: 'bottom',
          source: {
            cell: source.cell.toString(),
            port: outputPortId.toString(),
            anchor: {
              name: 'bottom',
            },
          },
          target: {
            cell: id.toString(),
            port: portId,
            anchor: {
              name: 'center',
            },
          },
          label: '',
          zIndex: 1,
        });
      });
    }
    if (edgesToOutside?.length) {
      const portId = (Date.now() + 1).toString();
      portItems.push({group: 'out', id: portId, connected: false});
      edgesToOutside.forEach((edge) => {
        const {target, inputPortId} = edge;
        edges.push({
          type: 'group',
          sourceAnchor: 'bottom',
          source: {
            cell: id,
            port: portId,
            anchor: {
              name: 'bottom',
            },
          },
          target: {
            cell: target.cell,
            port: inputPortId,
            anchor: {
              name: 'center',
            },
          },
          label: '',
          zIndex: 1,
        });
      });
    }
    return {
      type: 'group',
      ...groupData,
      id: id.toString(),
      x,
      y,
      width,
      height,
      zIndex: 1,
      data: {...groupData, type: 'group', includedNodes, id: id.toString()},
      ports: {
        items: portItems,
      },
    };
  }
  return {
    type: 'group',
    ...groupData,
    id: id.toString(),
    x,
    y,
    width,
    height,
    zIndex: 1,
    data: {...groupData, type: 'group', includedNodes, id: id.toString()},
  };
}
export function formatGraphData(graphData = {}) {
  const {nodes = [], links = [], groups = []} = graphData;
  const formattedEdges = links.map((link) => {
    const {source, outputPortId, target, inputPortId} = link;
    return {
      ...link,
      data: {...link},
      sourceAnchor: 'bottom',
      source: {
        cell: source.toString(),
        port: outputPortId.toString(),
        anchor: {
          name: 'bottom',
        },
      },
      target: {
        cell: target.toString(),
        port: inputPortId.toString(),
        anchor: {
          name: 'center',
        },
      },
      label: '',
      zIndex: 1,
    };
  });
  const inputPortConnectedMap = formattedEdges.reduce((acc, edge) => {
    acc[edge.inputPortId] = true;
    return acc;
  }, {});
  const formattedNodes = nodes.map((nodeData) => formatNodeInfoToNodeMeta(nodeData, inputPortConnectedMap));
  const formattedGroups = groups.map((groupData) => formatGroupInfoToNodeMeta(groupData, formattedNodes, formattedEdges));
  return {
    nodes: [...formattedNodes, ...formattedGroups.filter((group) => !!group?.data?.includedNodes?.length)],
    edges: formattedEdges,
  };
}
