import {useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {BehaviorSubject, fromEventPattern, timer} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import produce from 'immer';
import {ConfigProvider, message, Tooltip} from 'antd';
import {ANT_PREFIX} from '../../constants/global';
import {RERENDER_EVENT} from '../../constants/graph';
import {GraphCore} from './graph-core';
import {X6DemoGroupNode, X6DemoNode} from '../common/graph-common/shape/node';
import {GuideEdge, X6DemoGroupEdge} from '../common/graph-common/shape/edge';
import {NodeElement} from '../dag-canvas/elements/node-element';
import {NodeGroup} from '../dag-canvas/elements/node-group';
import {expandGroupAccordingToNodes, formatGraphData, formatNodeInfoToNodeMeta} from './graph-util';
import {queryGraph, addNode, copyNode} from '../../mock/graph';
import {queryGraphStatus, runGraph, stopGraphRun} from '../../mock/status';
export function parseStatus(data) {
  const {execInfo, instStatus} = data;
  Object.entries(execInfo).forEach(([id, val]) => {
    val.jobStatus = instStatus[id];
  });
  return data;
}
class ExperimentGraph extends GraphCore {
  nodeMetas;
  edgeMetas;
  pendingNodes = [];
  experimentId;
  loading$ = new BehaviorSubject(false);
  running$ = new BehaviorSubject(false);
  experiment$ = new BehaviorSubject(null);
  experimentGraph$ = new BehaviorSubject(null);
  activeNodeInstance$ = new BehaviorSubject(null);
  executionStatus$ = new BehaviorSubject(null);
  activeModal$ = new BehaviorSubject(null);
  selectedGroup$ = new BehaviorSubject(undefined);
  experimentGraphSub;
  executionStatusQuerySub;
  reRenderSub;
  constructor(expId) {
    super({
      history: true,
      frozen: true,
      selecting: {
        enabled: true,
        rubberband: false,
        multiple: true,
        strict: true,
        showNodeSelectionBox: false,
        selectNodeOnMoved: false,
      },
      keyboard: {
        enabled: true,
      },
      connecting: {
        snap: {radius: 10},
        allowBlank: false,
        highlight: true,
        connector: 'pai',
        sourceAnchor: 'bottom',
        targetAnchor: 'center',
        connectionPoint: 'anchor',
        createEdge() {
          return new GuideEdge({
            attrs: {
              line: {
                strokeDasharray: '5 5',
                stroke: '#808080',
                strokeWidth: 1,
                targetMarker: {
                  name: 'block',
                  args: {
                    size: '6',
                  },
                },
              },
            },
          });
        },
        validateEdge: args => {
          const {edge} = args;
          return !!edge?.target?.port;
        },
        validateMagnet({magnet}) {
          return magnet.getAttribute('port-group') !== 'in';
        },
        validateConnection({sourceView, targetView, sourceMagnet, targetMagnet}) {
          if (sourceView === targetView) {
            return false;
          }
          if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
            return false;
          }
          if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
            return false;
          }
          const portId = targetMagnet.getAttribute('port');
          const node = targetView.cell;
          const port = node.getPort(portId);
          return !(port && port.connected);
        },
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
      highlighting: {
        nodeAvailable: {
          name: 'className',
          args: {
            className: 'available',
          },
        },
        magnetAvailable: {
          name: 'className',
          args: {
            className: 'available',
          },
        },
        magnetAdsorbed: {
          name: 'className',
          args: {
            className: 'adsorbed',
          },
        },
      },
      onPortRendered(args) {
        const {port} = args;
        const {contentSelectors} = args;
        const container = contentSelectors && contentSelectors.content;
        const placement = port.group === 'in' ? 'top' : 'bottom';
        const cls = port.connected ? 'ais-port connected' : 'ais-port';
        if (container) {
          createRoot(container).render(
            <ConfigProvider prefixCls={ANT_PREFIX}>
              <Tooltip title={port.description} placement={placement}>
                <span className={cls} />
              </Tooltip>
            </ConfigProvider>,
          );
        }
      },
    });
    this.experimentId = expId;
    this.initialize();
  }
  async initialize() {
    const {experimentId} = this;
    this.loading$.next(true);
    try {
      await this.loadExperiment(experimentId);
      await this.loadExperimentGraph(experimentId);
      await this.loadExecutionStatus(experimentId);
      this.loading$.next(false);
    } catch (e) {
      this.loading$.next(false);
      console.error('加载实验错误', e);
    }
  }
  async changeExperiment(id) {
    this.experimentId = id;
    await this.initialize();
  }
  async loadExperiment(experimentId) {
    try {
      const res = {
        projectName: 'sre_mpi_algo_dev',
        gmtCreate: '2020-08-18 02:21:41',
        description: '用户流失数据建模demo',
        name: '建模流程 DEMO',
        id: 353355,
      };
      this.experiment$.next(res);
      return {success: true};
    } catch (e) {
      console.error('加载实验错误', e);
      return {success: false};
    }
  }
  async loadExperimentGraph(experimentId) {
    const graphRes = await queryGraph(experimentId);
    this.experimentGraph$.next(graphRes.data);
  }
  async updateExperimentGraph(nodes = [], links = []) {
    const oldGraph = this.experimentGraph$.getValue();
    const newGraph = produce(oldGraph, nextGraph => {
      if (nodes.length) {
        nextGraph.nodes.push(...nodes);
      }
      if (links.length) {
        nextGraph.links.push(...links);
      }
    });
    this.experimentGraph$.next(newGraph);
  }
  async delExperimentGraphElement(nodes = [], links = []) {
    const oldGraph = this.experimentGraph$.getValue();
    const newGraph = produce(oldGraph, nextGraph => {
      if (nodes.length) {
        nextGraph.nodes = oldGraph.nodes.filter(node => !nodes.includes(node.id.toString()));
        nextGraph.links = oldGraph.links.filter(link => !nodes.find(node => [link.source.toString(), link.target.toString()].includes(node)));
      } else {
        nextGraph.links = oldGraph.links.filter(link => {
          return !links.find(delLink => {
            return delLink.inputPortId.toString() === link.inputPortId.toString() && delLink.outputPortId.toString() === link.outputPortId.toString();
          });
        });
      }
    });
    this.experimentGraph$.next(newGraph);
  }
  loadExecutionStatus = async experimentId => {
    this.executionStatusQuerySub?.unsubscribe();
    this.executionStatusQuerySub = timer(0, 5000).subscribe(async resPromise => {
      const execStatusRes = await queryGraphStatus();
      this.executionStatus$.next(execStatusRes.data);
      this.updateEdgeStatus();
      const {status} = execStatusRes.data;
      if (status === 'default') {
        this.running$.next(false);
        this.executionStatusQuerySub?.unsubscribe();
      } else {
        this.running$.next(true);
      }
    });
  };
  isGraphReady() {
    return !!this.graph;
  }
  renderGraph = (wrapper, container) => {
    this.experimentGraphSub = this.experimentGraph$
      .pipe(
        filter(x => !!x),
        take(1),
      )
      .subscribe(graphData => {
        if (!this.graph) {
          const {nodes, edges} = formatGraphData(graphData);
          super.render({
            wrapper,
            container,
            nodes,
            edges,
          });
        }
      });
    this.reRenderSub = fromEventPattern(
      handler => {
        window.addEventListener(RERENDER_EVENT, handler);
      },
      handler => {
        window.removeEventListener(RERENDER_EVENT, handler);
      },
    ).subscribe(this.handlerResize);
  };
  renderNode(nodeMeta) {
    const {experimentId} = this;
    const {data} = nodeMeta;
    const {type, includedNodes = []} = data;
    if (type === 'node') {
      const node = this.graph.addNode(
        new X6DemoNode({
          ...nodeMeta,
          shape: 'ais-rect-port',
          component: <NodeElement experimentId={experimentId} />,
        }),
      );
      if (nodeMeta.data.hide) {
        this.pendingNodes.push(node);
      }
      return node;
    }
    if (type === 'group' && includedNodes?.length) {
      const group = this.graph.addNode(
        new X6DemoGroupNode({
          ...nodeMeta,
          shape: 'react-shape',
          component: <NodeGroup experimentId={experimentId} />,
        }),
      );
      includedNodes.forEach(normalNode => {
        const targetNode = this.getNodeById(normalNode.id);
        group.addChild(targetNode);
      });
      return group;
    }
    return undefined;
  }
  afterLayout() {
    super.afterLayout();
    this.pendingNodes.forEach(node => {
      node.hide();
    });
    this.pendingNodes = [];
  }
  renderEdge(edgeMeta) {
    const {type} = edgeMeta;
    if (type === 'group') {
      return this.graph.addEdge(new X6DemoGroupEdge(edgeMeta));
    }
    return this.graph.addEdge(new GuideEdge(edgeMeta));
  }
  validateContextMenu = info => {
    return !(info.type === 'edge' && info?.data?.edge?.isGroupEdge());
  };
  onSelectNodes(nodes) {
    const selectedNodes = nodes.filter(cell => cell.isNode() && !cell.isGroup());
    const selectedGroups = nodes.filter(cell => cell.isNode() && cell.isGroup());
    if (selectedNodes.length === 1) {
      const cell = selectedNodes[0];
      const nodeData = cell.getData();
      const currentActiveNode = this.activeNodeInstance$.getValue();
      if (currentActiveNode?.id !== nodeData?.id) {
        this.activeNodeInstance$.next(nodeData);
      }
    } else {
      this.selectedNodes$.next(selectedNodes);
      this.activeNodeInstance$.next(null);
    }
    if (selectedGroups.length === 1) {
      this.selectedGroup$.next(selectedGroups[0]);
    } else {
      this.selectedGroup$.next(undefined);
    }
  }
  handlerResize = e => {
    if (e.detail === this.experimentId) {
      this.resizeGraph();
    }
  };
  async onConnectNode(args) {
    const {edge = {}, isNew} = args;
    const {source, target} = edge;
    if (isNew) {
      const node = args.currentCell;
      const portId = edge.getTargetPortId();
      if (node && portId) {
        node.setPortProp(portId, 'connected', true);
        edge.attr({
          line: {
            strokeDasharray: '',
            targetMarker: '',
            stroke: '#808080',
          },
        });
        const data = {
          source: source.cell,
          target: target.cell,
          outputPortId: source.port,
          inputPortId: target.port,
        };
        edge.setData(data);
        this.updateExperimentGraph([], [data]);
      }
    }
    return {success: true};
  }
  onConnectionRemoved(args) {
    try {
      const {edge} = args;
      const {target} = edge;
      const {cell: nodeId, port: portId} = target;
      if (nodeId) {
        const targetCell = this.getNodeById(nodeId);
        if (targetCell) {
          targetCell.setPortProp(portId, 'connected', false);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
  onMoveNodeStart(args) {
    const {node} = args;
    const parent = node.getParent();
    const parentData = parent?.getData();
    if (parentData && !parentData?.isCollapsed) {
      expandGroupAccordingToNodes({moveNodes: [node]});
    }
  }
  async onMoveNodes(movedNodes) {
    const targetNodes = movedNodes.filter(arg => {
      const {node} = arg;
      return !node.isGroup();
    });
    if (targetNodes?.length) {
      const newPos = targetNodes.map(moveNode => {
        const {current, node} = moveNode;
        const {x, y} = current;
        const {id} = node;
        this.updateNodeById(id, node => {
          node.setData({x, y});
        });
        return {
          nodeInstanceId: id,
          posX: Math.round(x),
          posY: Math.round(y),
        };
      });
      const oldGraph = this.experimentGraph$.getValue();
      const newGraph = produce(oldGraph, nextGraph => {
        newPos.forEach(position => {
          const {nodeInstanceId, posX, posY} = position;
          const matchNode = nextGraph.nodes.find(item => item.id.toString() === nodeInstanceId.toString());
          if (matchNode) {
            matchNode.positionX = posX;
            matchNode.positionY = posY;
          }
        });
      });
      this.experimentGraph$.next(newGraph);
    }
  }
  onDeleteNodeOrEdge(args) {
    const {nodes, edges} = args;
    const normalNodes = nodes.filter(node => !node.isGroup());
    if (normalNodes?.length) {
      this.requestDeleteNodes(normalNodes.map(node => node.id));
    }
    if (edges?.length) {
      this.requestDeleteEdges(edges);
    }
  }
  validateNodeCopyable(cell) {
    return cell?.isNode() && !cell.isGroup();
  }
  onCopyNode(node) {
    try {
      const nodeData = node.getData();
      const res = copyNode(nodeData);
      const newNode = formatNodeInfoToNodeMeta(res);
      this.addNode(newNode);
      this.clearContextMenuInfo();
    } catch (error) {
      message.error('复制节点失败，请重试');
    }
  }
  updateEdgeStatus = () => {
    if (this.graph) {
      const {graph} = this;
      const executionStatus = this.executionStatus$.getValue();
      const {instStatus} = executionStatus;
      const nodeIds = Object.keys(instStatus);
      const runningNodeIds = nodeIds.filter(id => instStatus[id] === 'running').map(i => i.toString());
      this.updateEdges(edges => {
        edges.forEach(edge => {
          const {
            target: {cell: nodeId},
            id,
          } = edge;
          const view = graph?.findViewByCell(id);
          if (!view) {
            return;
          }
          if (runningNodeIds.includes(nodeId.toString())) {
            view.addClass('edgeProcessing');
          } else {
            view.removeClass('edgeProcessing');
          }
        });
      });
    }
  };
  runGraph = async () => {
    try {
      const {experimentId, nodeMetas = []} = this;
      await runGraph(nodeMetas);
      this.running$.next(true);
      this.clearContextMenuInfo();
      this.loadExecutionStatus(experimentId);
      return {success: true};
    } catch (e) {
      console.error(`执行失败`, e);
      return {success: false};
    }
  };
  stopRunGraph = async () => {
    try {
      const {experimentId} = this;
      const stopRes = await stopGraphRun();
      this.running$.next(false);
      this.clearContextMenuInfo();
      this.loadExecutionStatus(experimentId);
      return stopRes;
    } catch (e) {
      console.error(`停止失败`, e);
      return {success: false};
    }
  };
  setActiveAlgoData = data => {
    if (!data) {
      this.activeNodeInstance$.next(null);
      return;
    }
    const oldData = this.activeNodeInstance$.getValue();
    this.activeNodeInstance$.next({...oldData, ...data});
  };
  requestAddNode = async param => {
    const {graph} = this;
    if (graph) {
      const {nodeMeta, clientX, clientY} = param;
      const pos = graph.clientToLocal(clientX, clientY);
      const nodeRes = await addNode({...nodeMeta, ...pos});
      this.updateExperimentGraph([nodeRes]);
      const newNode = formatNodeInfoToNodeMeta(nodeRes);
      this.addNode(newNode);
      return {success: true};
    }
    return {success: false};
  };
  requestDeleteNodes = async ids => {
    const nodeInstanceIds = [].concat(ids);
    if (this.graph && nodeInstanceIds.length) {
      this.deleteNodes(nodeInstanceIds);
      this.clearContextMenuInfo();
      const activeNodeInstance = this.activeNodeInstance$.getValue();
      if (activeNodeInstance && nodeInstanceIds.map(i => i.toString()).includes(activeNodeInstance.id.toString())) {
        this.activeNodeInstance$.next(null);
      }
      this.delExperimentGraphElement(nodeInstanceIds, []);
      return {success: true};
    }
    return {success: false};
  };
  requestDeleteEdges = async edges => {
    const targetEdges = [].concat(edges);
    console.log(targetEdges);
    this.deleteEdges(targetEdges);
    this.delExperimentGraphElement(
      [],
      targetEdges.map(cell => cell.getData()),
    );
    return {success: true};
  };
  undoDeleteNode = async () => {
    this.undo();
  };
  renameNode = async (nodeInstanceId, newName) => {
    const renameRes = await {success: true};
    if (renameRes.success) {
      const cell = this.getCellById(nodeInstanceId);
      const data = cell.getData();
      const newData = {...data, name: newName};
      cell.setData(newData);
      this.updateExperimentGraph([newData]);
    }
    return renameRes;
  };
  zoomGraph = factor => {
    this.zoom(factor);
  };
  zoomGraphToFit = () => {
    this.zoom('fit');
  };
  zoomGraphRealSize = () => {
    this.zoom('real');
  };
  deleteEdgeFromContextMenu = async edge => {
    await this.requestDeleteEdges(edge);
    this.clearContextMenuInfo();
  };
  unSelectNode = () => {
    const {graph} = this;
    if (graph) {
      graph.cleanSelection();
    }
    this.selectedGroup$.next(null);
    this.selectedNodes$.next([]);
  };
  async setModal(params) {
    this.activeModal$.next(params);
  }
  dispose() {
    this.experimentGraphSub?.unsubscribe();
    this.executionStatusQuerySub?.unsubscribe();
    this.reRenderSub?.unsubscribe();
    super.dispose();
  }
}
export const gModelMap = new Map();
export const useExperimentGraph = experimentId => {
  const expId = experimentId.toString();
  let existedExperimentGraph = gModelMap.get(expId);
  if (!existedExperimentGraph) {
    existedExperimentGraph = new ExperimentGraph(expId);
    gModelMap.set(expId, existedExperimentGraph);
  }
  return existedExperimentGraph;
};
export const useUnmountExperimentGraph = experimentId => {
  useEffect(() => {
    return () => {
      const existedExperimentGraph = gModelMap.get(experimentId);
      if (existedExperimentGraph) {
        existedExperimentGraph.dispose();
        gModelMap.delete(experimentId);
      }
    };
  }, [experimentId]);
};
