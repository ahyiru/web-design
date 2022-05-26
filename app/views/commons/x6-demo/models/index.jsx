import { useCallback } from 'react';
import {useStore} from '@huxy/use';
import { algoData, searchByKeyword } from '../mock/algo';
/* function dfs(path = '', nodes, isTarget, result = []) {
  nodes.forEach((node, idx) => {
    if (node.children) {
      const currentIdx = path ? `${path}.${idx}.children` : `${idx}.children`;
      dfs(currentIdx, node.children, isTarget, result);
    }
    if (isTarget(node)) {
      const currentIdx = path ? `${path}.${idx}` : idx;
      result.push(currentIdx.toString());
    }
  });
} */
const useModel = (name) => {
  const [state,setState]=useStore(name,{
    keyword:'',
    loading:false,
    componentTreeNodes:[],
    searchList:[],
  });
  const setItem=(key,value)=>{
    setState({[key]:typeof value==='function'?value(state[key]):value});
  };
  const setKeyword=useCallback(value=>{
    setItem('keyword',value);
  },[]);
  const loadComponentNodes = useCallback(() => {
    setItem('loading',true);
    const load = async () => {
      try {
        if (algoData) {
          setItem('componentTreeNodes',algoData);
        }
      }
      finally {
        setItem('loading',false);
      }
    };
    return load();
  }, []);
  const search = useCallback((params) => {
    setKeyword(params.keyword ? params.keyword : '');
    if (!params.keyword) {
      return;
    }
    setItem('loading',true);
    const load = async () => {
      try {
        const nodes = await searchByKeyword(params.keyword) || [];
        setItem('searchList',nodes);
      }
      finally {
        setItem('loading',false);
      }
    };
    load();
  }, []);
  return {...state,setKeyword,loadComponentNodes,search};
};

export default useModel;

