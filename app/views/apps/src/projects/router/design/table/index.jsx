import {Divider} from 'antd';
import Actions from './actions';
import Columns from './columns';
import FormEditor from '../formEditor';
import Panel from '@app/components/panel';

const TableEditor = props => {
  const {data = {}, getValues, designConfigText, actionsText = {}} = props;
  const {editorI18n = {}, actionI18n = {}, columnI18n = {}} = designConfigText || {};
  const getActions = values => {
    // console.log(1,values);
    data.actions = values;
    getValues?.(data);
  };
  const getColumns = values => {
    // console.log(2,values);
    data.columns = values;
    getValues?.(data);
  };
  const getSearchForm = values => {
    // console.log(3,values);
    data.searchSchema = values;
    getValues?.(data);
  };
  const getModalForm = values => {
    // console.log(4,values);
    data.modalSchema = values;
    getValues?.(data);
  };
  return (
    <>
      <h4 style={{margin: '10px 0'}}>{editorI18n.actions}</h4>
      <Panel style={{height: 'auto'}}>
        <Actions getValues={getActions} data={data.actions || []} actionI18n={actionI18n} />
      </Panel>
      <Divider dashed style={{borderColor: 'rgba(255,255,255,.1)'}} />
      <h4 style={{margin: '10px 0'}}>{editorI18n.searchForm}</h4>
      <FormEditor getValues={getSearchForm} data={data.searchSchema} editorI18n={editorI18n} actionsText={actionsText} />
      <Divider dashed style={{borderColor: 'rgba(255,255,255,.1)'}} />
      <h4 style={{margin: '10px 0'}}>{editorI18n.columns}</h4>
      <Panel style={{height: 'auto'}}>
        <Columns getValues={getColumns} data={data.columns || []} columnI18n={columnI18n} />
      </Panel>
      <Divider dashed style={{borderColor: 'rgba(255,255,255,.1)'}} />
      <h4 style={{margin: '10px 0'}}>{editorI18n.modalForm}</h4>
      <FormEditor getValues={getModalForm} data={data.modalSchema} editorI18n={editorI18n} actionsText={actionsText} />
    </>
  );
};

export default TableEditor;
