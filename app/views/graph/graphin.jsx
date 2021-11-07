import {useState,useContext} from 'react';
import Graphin, { GraphinContext, Utils } from '@antv/graphin';
import { ContextMenu, CreateEdge, Toolbar } from '@antv/graphin-components';
import { message } from 'antd';
import { TagFilled, DeleteFilled, ExpandAltOutlined, PlusCircleOutlined } from '@ant-design/icons';

import testImage from '@app/assets/images/logo.png';

const { Menu } = ContextMenu;

const options = [
  {
    key: 'tag',
    icon: <TagFilled />,
    name: '打标',
  },
  {
    key: 'delete',
    icon: <DeleteFilled />,
    name: '删除',
  },
  {
    key: 'expand',
    icon: <ExpandAltOutlined />,
    name: '扩散',
  },
];

const CanvasMenu = () => {
  const { graph, contextmenu } = useContext(GraphinContext);

  const context = contextmenu.canvas;

  const handleDownload = () => {
    graph.downloadFullImage('canvas-contextmenu');
    context.handleClose();
  };
  const handleClear = () => {
    message.info(`清除画布成功`);
    context.handleClose();
  };
  const handleStopLayout = () => {
    message.info(`停止布局成功`);
    context.handleClose();
  };

  return (
    <Menu bindType="canvas">
      <Menu.Item onClick={handleClear}>清除画布</Menu.Item>
      <Menu.Item onClick={handleStopLayout}>停止布局</Menu.Item>
      <Menu.Item onClick={handleDownload}>下载画布</Menu.Item>
    </Menu>
  );
};

const layout={
  type: 'concentric',
  nodeSize:300,
};
const theme={
  mode: 'light',
  primaryColor: '#D77622',
  nodeSize:32,
  edgeSize:2,
  primaryEdgeColor:'#60f',
};

const edges = [
  {
    source: 'node-0',
    target: 'node-0',
    style: {
      label: {
        value: '自环边-1',
        offset: [0, 0],
      },
      keyshape: {
        type: 'loop',
        loop: {
          distance: 0,
        },
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-0',
    style: {
      label: {
        value: '自环边-2',
        offset: [0, 0],
      },
      keyshape: {
        type: 'loop',
        loop: {
          distance: 10,
        },
      },
    },
  },

  {
    source: 'node-0',
    target: 'node-1',
    style: {
      label: {
        value: '设置 keyshape 颜色 和 宽度 ',
      },
      keyshape: {
        stroke: 'red',
        // lineWidth: 4,
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-2',
    style: {
      label: {
        value: '设置 keyshape 虚线 ',
      },
      keyshape: {
        lineDash: [4, 4],
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-3',
    style: {
      label: {
        value: '设置 keyshape 箭头 ',
      },
      keyshape: {
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: '#545872',
        },
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-4',
    style: {
      label: {
        value: '设置 label 标签',
        fill: 'red',
        fontSize: 26,
        offset: [0, 0],
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-5',
    style: {
      label: {
        value: '设置 halo 光晕',
      },
      halo: {
        fill: '#ddd',
        visible: true,
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-6',
    style: {
      label: {
        value: '设置 label 的 background ',
        fill: '#fff',
        fontSize: 12,
        background: {
          // 设置背景的填充色
          fill: 'lightgreen',
          // 设置圆角
          radius: 8,
          // 设置border，即 stroke
          stroke: '#000',
        },
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-7',
    style: {
      label: {
        value: 'poly:40',
        offset: [0, 0],
      },
      keyshape: {
        type: 'poly',
        poly: {
          distance: 40,
        },
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-7',
    style: {
      label: {
        value: 'poly:-40',
        offset: [0, 0],
      },
      keyshape: {
        type: 'poly',
        poly: {
          distance: -40,
        },
        lineDash: [2, 2],
      },
    },
  },
];

const App = () => {
  const [active, setActive] = useState(true);
  const [data, setData] = useState(Utils.mock(8).circle().graphin());

  const handleMenuChange = (menuItem, menuData) => {
    message.info(`元素：${menuData.id}，动作：${menuItem.name}`);
  };

  const handleBarChange = (edges, edge) => {
    // 如果需要多边的话
    const pEdges = Utils.processEdges(edges, { poly: 50, loop: 10 });
    setData({ nodes: data.nodes,edges: pEdges});
  };
  const handleBarClick = () => {
    setActive(!active);
  };

  data.edges=edges;
  data.nodes=data.nodes.map((node,i)=>{
    const style={
      icon:{
        type: 'image',
        value: i%2?testImage:'https://pic2.zhimg.com/a2e68681a006bd3e60fd5b22d51cb629_im.jpg',
        size: [20, 20],
        clip: {
          r: 10,
        },
      },
      label:{
        value:`label-${i}`,
      },
      badges:(i===1||i===5)?[
        {
          position: 'RT',
          type: 'text',
          value: 8,
          size: [15, 15],
          fill: 'red',
          color: '#fff',
        },
      ]:undefined,
    };
    return {
      ...node,
      style,
    };
  });

  return (
    <div className="App">
      <Graphin data={data} layout={layout} theme={theme} height={650} fitView>
        <ContextMenu style={{ width: '80px' }}>
          <Menu options={options} onChange={handleMenuChange} bindType="node" />
        </ContextMenu>
        <ContextMenu style={{ width: '80px' }} bindType="canvas">
          <CanvasMenu />
        </ContextMenu>
        <ContextMenu style={{ width: '120px' }} bindType="edge">
          <Menu options={options.map(item => ({ ...item, name: `${item.name}-EDGE` }))} onChange={handleMenuChange} bindType="edge"
          />
        </ContextMenu>
        <Toolbar>
          <Toolbar.Item onClick={handleBarClick}>
            <CreateEdge onChange={handleBarChange} active={active} onClick={handleBarClick}>
              <PlusCircleOutlined /> {active ? '取消连线' : '建立关联'}
            </CreateEdge>
          </Toolbar.Item>
        </Toolbar>
      </Graphin>
    </div>
  );
};
export default App;

