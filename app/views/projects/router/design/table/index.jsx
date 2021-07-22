import {Divider} from 'antd';
import Actions from './actions';
import Columns from './columns';
import FormEditor from '../formEditor';
import Panel from '@app/components/panel';

const TableEditor=props=>{
  const {data={},getValues}=props;
  const getActions=values=>{
    // console.log(1,values);
    data.actions=values;
    getValues?.(data);
  };
  const getColumns=values=>{
    // console.log(2,values);
    data.columns=values;
    getValues?.(data);
  };
  const getSearchForm=values=>{
    // console.log(3,values);
    data.searchSchema=values;
    getValues?.(data);
  };
  const getModalForm=values=>{
    // console.log(4,values);
    data.modalSchema=values;
    getValues?.(data);
  };
  return <>
    <h4 style={{margin:'10px 0'}}>actions配置</h4>
    <Panel style={{height:'auto'}}><Actions getValues={getActions} data={data.actions||[]} /></Panel>
    <Divider dashed style={{borderColor:'rgba(255,255,255,.1)'}} />
    <h4 style={{margin:'10px 0'}}>searchForm配置</h4>
    <FormEditor getValues={getSearchForm} data={data.searchSchema} />
    <Divider dashed style={{borderColor:'rgba(255,255,255,.1)'}} />
    <h4 style={{margin:'10px 0'}}>columns配置</h4>
    <Panel style={{height:'auto'}}><Columns getValues={getColumns} data={data.columns||[]} /></Panel>
    <Divider dashed style={{borderColor:'rgba(255,255,255,.1)'}} />
    <h4 style={{margin:'10px 0'}}>modalForm配置配置</h4>
    <FormEditor getValues={getModalForm} data={data.modalSchema} />
  </>;
};

export default TableEditor;


