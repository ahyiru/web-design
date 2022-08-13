import {Space, Button} from 'antd';
import {Row, Col} from '@huxy/components';
import Panel from '@app/components/panel';
import SearchForm from './formList';

import WrapTable from './list/wrapTable';
import WrapList from './list/wrapList';
import AutoSizeList from './list/autoSizeList';
const compList = {
  table: WrapTable,
  list: WrapList,
  autoSize: AutoSizeList,
};

const Index = ({result, actionList, formList, columns, RenderItem, searchList, pageChange, rowSelection, paramsKey, rowKey = '_id', listType}) => {
  const List = compList[listType];
  return (
    <Row>
      {actionList?.length || formList?.length ? (
        <Col>
          <Panel>
            {actionList?.length ? (
              <div style={{float: 'left'}}>
                <Space size="small">
                  {actionList.map(({key, type, label, icon, action, disabled}) => (
                    <Button key={key} loading={result.isPending} onClick={e => action?.()} type={type} icon={icon} disabled={disabled}>
                      {label}
                    </Button>
                  ))}
                </Space>
              </div>
            ) : null}
            {formList?.length ? (
              <div style={{float: 'right'}}>
                <SearchForm formList={formList} submit={searchList} loading={result.isPending} />
              </div>
            ) : null}
          </Panel>
        </Col>
      ) : null}
      <Col>
        <Panel>
          <List result={result} columns={columns} RenderItem={RenderItem} pageChange={pageChange} rowSelection={rowSelection} rowKey={rowKey} paramsKey={paramsKey} />
        </Panel>
      </Col>
    </Row>
  );
};

export default Index;
