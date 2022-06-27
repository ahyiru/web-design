export function calcPointsInfo(points) {
  if (!Array.isArray(points) || !points.length) {
    throw new Error('计算坐标边缘必须传入一组坐标');
  }
  const Xs = points.map(({x}) => x);
  const Ys = points.map(({y}) => y);
  const minX = Math.min(Xs);
  const minY = Math.min(Ys);
  const maxX = Math.max(Xs);
  const maxY = Math.max(Ys);
  const middleX = (minX + maxX) / 2;
  const middleY = (minY + maxY) / 2;
  return {
    minX,
    minY,
    maxX,
    maxY,
    middleX,
    middleY,
  };
}
export function transformPointsToOrigin(points, origin) {
  return points.map((point) => ({
    ...point,
    x: point.x - origin.x,
    y: point.y - origin.y,
  }));
}
export function revertPointsToOrigin(points, origin) {
  return points.map((point) => ({
    ...point,
    x: point.x + origin.x,
    y: point.y + origin.y,
  }));
}
export function formatNodeToGraphNodeConf(originNode) {
  const {id, nodeInstanceId, positionX, positionY} = originNode;
  return {
    ...originNode,
    x: positionX || 0,
    y: positionY || 0,
    id: (nodeInstanceId || id).toString(),
    width: 180,
    height: 32,
    data: originNode,
    ports: {
      groups: {
        inputPorts: {
          position: {
            name: 'top',
            args: {
              dr: 0,
              dx: 0,
              dy: 0,
            },
          },
          attrs: {
            circle: {
              fill: '#ffffff',
              stroke: '#31d0c6',
              strokeWidth: 1,
              r: 4,
              style: 'cursor: default;',
            },
            text: {
              fill: '#6a6c8a',
            },
          },
        },
        outputPorts: {
          position: {
            name: 'bottom',
            args: {
              dr: 0,
              dx: 0,
              dy: 0,
            },
          },
          attrs: {
            circle: {
              fill: '#ffffff',
              stroke: '#31d0c6',
              strokeWidth: 1,
              r: 4,
              style: 'cursor: crosshair;',
            },
            text: {
              fill: '#6a6c8a',
            },
          },
        },
      },
    },
  };
}
export function formatExperimentGraph(graph = {}) {
  const {nodes = [], links = [], groups = []} = graph;
  const formattedNodes = nodes.map((node) => formatNodeToGraphNodeConf(node));
  const formattedEdges = links.map((link) => {
    const {source, target} = link;
    return {
      ...link,
      source: source.toString(),
      target: target.toString(),
      label: '',
    };
  });
  const groupNodeMap = groups.reduce((mapResult, currentGroup) => {
    const {id} = currentGroup;
    return {
      ...mapResult,
      [id]: formattedNodes.filter((node) => node.groupId.toString() === id.toString()) || [],
    };
  }, {});
  return {
    nodes: formattedNodes,
    edges: formattedEdges,
    groups,
    groupNodeMap,
  };
}
