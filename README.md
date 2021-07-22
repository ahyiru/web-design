## 低代码（low-code）简单实践

### 理解

低代码就是尽量**少写代码**，定义好业务组件，通过可视化操作实现开发工作。它主要受众是开发者。

无代码（no-code）即不需要写代码就能完成开发，更加偏向业务层的定制。

### 解决了什么？

> 提效降本、质量保障、降低开发门槛。

低代码可以提升开发效率，保障系统稳定性，也降低了开发门槛，可以直接可视化开发。

### 可能出现的问题

- 不灵活。适用于通用业务领域，对定制化需求不友好。
- 不可控。业务拓展性、可维护性较低。
- 不好用。开发不想用，业务不会用。

低代码或许可以降低开发门槛，但复杂度并不会降低。可视化开发的自由度越高，组件粒度就越细，配置复杂度就越高。

## 简单实践

前端低代码开发不仅是界面开发，应该还包含工程化、项目管理、api接口、权限控制等一些列的开发提效。

### 设计

一个页面其实就是一棵树，所以不管是拖拽还是配置，最终完成的就是一棵数据树。所以我们可以通过`json schema`来进行页面设计。

### 实现

#### 基础搭建

[工程化](https://mp.weixin.qq.com/s?__biz=MzAwOTI3MTk3Nw==&amp;mid=2455985991&amp;idx=1&amp;sn=f1ee35b789a052518a9d2ade54134497&amp;chksm=8cf5d081bb825997f7570355d36a7f6e0b24f56d8613e1a2174c9800c8709b41bf4e8c31ae58&token=300862977&lang=zh_CN#rd)、[layout设计](https://mp.weixin.qq.com/s?__biz=MzAwOTI3MTk3Nw==&amp;mid=2455985961&amp;idx=1&amp;sn=bc656fc27eea4fc204903d87e70215ff&amp;chksm=8cf5d0efbb8259f9780c0ca630bc668843c6fed262395e8a8fc76c4559de40e5d212b73e6806&token=300862977&lang=zh_CN#rd)、[权限和i18n](https://mp.weixin.qq.com/s?__biz=MzAwOTI3MTk3Nw==&amp;mid=2455986033&amp;idx=1&amp;sn=1f5bc749f32df0e0cc84b08125a4bc32&amp;chksm=8cf5d0b7bb8259a18b1843e3c2693e72cfb40ff35c40707e32bf653e6e11ca1d6ae812c6cbcc&token=300862977&lang=zh_CN#rd)、[API管理](https://mp.weixin.qq.com/s?__biz=MzAwOTI3MTk3Nw==&amp;mid=2455986140&amp;idx=1&amp;sn=50b43b26a16abd10adf466a735a6da41&amp;chksm=8cf5d01abb82590c557cd3a80f6c5adb41194a7a501ae238bd39b28dcfe1319b9ad0fbc9ce4c&token=300862977&lang=zh_CN#rd) 这些都是一些管理平台的基础设施，前面也讲过，大家可以去看看。

***创建项目***

***创建用户并分配项目***

***创建API***


***新建项目路由***

***为用户设置路由权限***

#### 页面设计

***schema设计***


```javascript
const schema={
  type:'a',
  props:{},
  children:[],
};


```

***type***

type：标签名或组件名。组件可以是UI组件或业务组件，先注册再使用。

props：属性配置。组件的属性可根据组件库或自定义组件使用文档去配置。如果属性里面含有组件，可依照schema渲染原则执行。

children：子节点。可以是文本节点，组件，或子元素列表。

***schema render***


```javascript
const render=(schema,params)=>{
  schema=Array.isArray(schema)?schema:[schema];
  const dom=schema.map((item,i)=>{
    let {type,props,children}=item;
    type=(type||'div').trim();
    const first=type.charAt(0);
    type=first.toUpperCase()===first?(components[type]||'div'):type;
    props={
      key:i,
      ...formatProps(props,params),
    };
    children=Array.isArray(children)?render(children,params):[formatChildren(children||props.children,params)??null];
    return createElement(type,props,...children);
  });
  return dom;
};


```

components：我们注册的组件。

formatProps、formatChildren：将props或children转换为我们需要的运行时的值。主要用于我们自定义的组件。props或children可以是函数，可以传递我们需要的参数params，最终返回我们需要的数据。

通过 react 的 `createElement(type,props,...children)` 渲染。


***属性解析***

```javascript
const render=(schema,params)=>{
  schema=Array.isArray(schema)?schema:[schema];
  const dom=schema.map((item,i)=>{
    let {type,props,children}=item;
    type=(type||'div').trim();
    const first=type.charAt(0);
    type=first.toUpperCase()===first?(components[type]||'div'):type;
    props={
      key:i,
      ...formatProps(props,params),
    };
    children=Array.isArray(children)?render(children,params):[formatChildren(children||props.children,params)??null];
    return createElement(type,props,...children);
  });
  return dom;
};


```

可使用自定义函数，组件内部数据作为参数，来获取属性值。或直接使用全局configs。

例如：

```javascript
{
  prop:'test',
  isPending:`{true}`,
  style:`{{width:'800px'}}`,
  handle:`{self=>self.rules}`,
  onClick:`{()=>e=>alert('hello')}`,
}

```

通过 `{code}` 将code字符串转换为运行时代码。

***判断并提取字符串代码***

```javascript
const matchedStr=(str,c=['{','}'])=>str?.trim?.().match(new RegExp(`^${c[0]}([\\s\\S]*)${c[1]}$`))?.[1];

```


***执行字符串代码***

```javascript
const str2code=(str,hasReturn=false)=>{
  str=hasReturn?str:`return ${str};`;
  const exec=Function(str);
  return exec();
};

```

> str2code会直接执行并返回结果，如果返回的是函数会执行函数并返回结果。如果我们需要返回函数，就要包裹一层函数。例如：`onClick`，`{()=>e=>alert('hello')}`。

***路由设置***

```javascript
{
  path:'/low-code',
  name:'低代码',
  icon:'CoffeeOutlined',
  denied:false,
  children:[
    {
      path:'/dom',
      name:'原生dom',
      icon:'CodeOutlined',
      componentPath:'/lowCode',
      loadData:{
        pageSchema,
      },
    },
    {
      path:'/ui',
      name:'UI组件',
      icon:'CodeOutlined',
      componentPath:'/lowCode',
      loadData:{
        pageSchema,
      },
    },
    {
      path:'/users',
      name:'业务组件',
      icon:'CodeOutlined',
      componentPath:'/lowCode',
      loadData:{
        pageSchema,
      },
    },
    {
      path:'/users/add',
      name:'新增用户',
      componentPath:'/lowCode',
      loadData:{
        pageSchema,
      },
    },
    {
      path:'/users/edit/:id',
      name:'编辑用户',
      componentPath:'/lowCode',
      loadData:{
        pageSchema,
      },
    },
  ],
}

```

如果整个系统都是通过 `schema` 数据配置生成的，那么我们只需一个渲染器，通过路由获取到 `shcema` 数据，然后渲染成当前路由页面。所以只需一个渲染文件即可。


根据 `projectId`、`routerId` 获取路由页面数据。

```javascript
const pageSchema=async ({id})=>{
  const {result}=await apiList.listSchemaFn({routerId:id,projectId:defProject._id});
  return {result};
};

```

通过设置路由 `loadData` 来提前请求数据，页面直接获取即可。详细使用见[useRouter](https://mp.weixin.qq.com/s?__biz=MzAwOTI3MTk3Nw==&amp;mid=2455986102&amp;idx=1&amp;sn=4328f6e2d4d3077d7aac4962dbbaa736&amp;chksm=8cf5d070bb8259661c6782d0235e12afce48fe6ce6d63139066a2d264feba61ee3769b32a66b&token=300862977&lang=zh_CN#rd)

```javascript
const pageSchema=async ({id})=>{
  const {result}=await apiList.listSchemaFn({routerId:id,projectId:defProject._id});
  return {result};
};

```

页面渲染。

```javascript
const Index=props=>{
  const {pageSchema}=props;
  if(pageSchema==null||pageSchema.pending){
    return <Spinner global />;
  }
  return customRender(pageSchema.result||[],{},props);
};

```

***props编辑***

```javascript
const editProps=values=>{
  const tree=editNodes(schemaTree,selectedKey,{props:values},'key');
  setSchema(tree);
  record(clone(tree));
  setDisableUndo(false);
};

```

每次编辑都会触发 `schema` 更新，并会记录每次操作的数据，使用 `record` 函数记录，便于我们完成撤销重做功能。

***cacheData函数***

```javascript
const {record,undo,redo,clean}=cacheData();

```

***撤销重做***

```javascript
const undoDesign=()=>{
  const {index,data}=undo();
  setSchema(data);
  if(index===0){
    setDisableUndo(true);
  }
  setDisableRedo(false);
};

const redoDesign=()=>{
  const {index,length,data}=redo();
  setSchema(data);
  if(index===length-1){
    setDisableRedo(true);
  }
  setDisableUndo(false);
};

```

***组件移动***

提供了组件移动功能，可根据需要自行拖动。


```javascript
const onDrop=info=>{
  const fromId=info.dragNode.key;
  const toId=info.node.key;
  const dropPosition=info.dropPosition;
  const tree=moveNodes(schemaTree,fromId,toId,dropPosition,'key');
  setSchema(tree);
};

```

### 搭建

#### 原生dom

#### 基础组件

#### 业务组件


示例：

1. 原生dom
2. 基础组件
3. 业务组件

业务组件有数据处理，需要我们在设计时预留属性可视化配置方案。

需要我们写一些通用业务组件，来实现配置生成页面。

认清没有一劳永逸的方法

根据业务需求 定制快速开发 易维护易拓展的系统






















