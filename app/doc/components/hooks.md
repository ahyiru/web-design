## use


### useAsync

异步处理

```javascript
const [result, updateResult] = useAsync({});
const update = useCallback(params => updateResult({res: fetchList({...commonParams, ...params})}, handleResult), []);
```

- result：返回结果
- updateResult：更新函数。如：{userList: fetcher()}，userList：存在 result 里面的字段名，fetcher：自己的请求封装函数
- handleResult：处理返回结果函数

### useBase64

将图片 src 地址 改为 base64。

```javascript
const Base64Image = ({src, ...rest}) => {
  const url = useBase64(src);
  return <img decoding="async" loading="lazy" {...rest} src={url} />;
};
```


### useCancelablePromise

可取消异步函数

```javascript
const {cancelablePromise} = useCancelablePromise();

cancelablePromise(asyncFn, delay)
  .then(res => {})
  .catch(error => {});
```

- delay：超时中断，默认 true，超时时间 2 分钟

### useClickAway

点击区域外部时触发的事件

```javascript
useClickAway(liRef, e => li.open && itemClick(e, li));
```

第一个参数为区域元素，第二个为点击区域外部时的回调函数。

### useDebounce

```javascript
useDebounce(fn, (delay = 60));
```

第一个参数为需要防抖的函数，第二个为防抖时间，默认 60ms。

### useDelayState

延迟获取 state

- delay：延迟时间，默认 450ms

```javascript
const [delayOpen] = useDelayState(open, delay);
```

### useFirstMounted

是否为第一次加载

```javascript
const isFirst = useFirstMounted();
```

### useInterval

定时器

```javascript
const [count, setCount] = useState(0);
const [stop, setStop] = useState(false);

const delay = 3000;

useInterval(() => {
  setCount(count + 1);
}, stop ? null : delay);
```

第一个参数为回调函数，第二个参数是延迟时间。当 delay 值为 null 或 false 时，会停止回调函数的执行。

### usePrevious

上一个 state 值

```javascript
const prevState = usePrevious(state);
```

### useRaf

requestAnimationFrame

```javascript
const [state, setState] = useRaf({});
```

### useScroll

```javascript
const state = useScroll(element);
```

传入监听滚动的元素，默认 window

返回 state 为滚动位置信息。

### useSearch

搜索函数

```javascript
const [filterTree, setFilterTree] = useSearch(null);

setFilterTree(data, keyword, (fields = 'name'), (childKey = 'children'), (exact = false));
```

- data：列表数据
- keyword：搜索值
- fields：搜索字段，字符串或数组
- childKey：子节点 key
- exact：是否为模糊搜索

### useStore

状态管理

```javascript
const [state, update, subscribe, clean] = useStore(name, initState);
```

input：

- name：事件 key
- initState：初始化值

output：

- state：状态值
- update：更新状态
- subscribe：监听状态
- clean：清除监听

可以自定义状态管理库：

```javascript
const store = createStore();

const useStore = createContainer(store);
```

### useUpdate

更新

```javascript
const rerender = useUpdate();
rerender();
```

### useUpdateEffect

初次进入不执行，state 发生变更时执行。

```javascript
useUpdateEffect(()=>{
  ...
  return ()=>...;
},[state]);

```

### useWinResize/useEleResize

```javascript
const {width} = useWinResize();

// delay：节流时间
const state = useEleResize(ref, (delay = 250));
```
