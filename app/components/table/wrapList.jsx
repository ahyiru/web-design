import {Form, Button, Table} from 'antd';

import './index.less';

const SearchForm = (props) => {
  const [form] = Form.useForm();
  const {submit, formItems} = props;
  return (
    <Form layout="inline" form={form} initialValues={{}} onFinish={submit}>
      {formItems}
      <Form.Item>
        <Button /* loading={loading} */ type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  );
};

const Index = (props) => {
  const {columns, pageChange, searchList, list, rowSelection, selectedRows, handleBatch, formItems} = props;
  const {data, pending} = list || {};
  const paginationCfg = {
    onShowSizeChange: (current, size) => pageChange(current, size),
    onChange: (current, size) => pageChange(current, size),
    showSizeChanger: true,
    showQuickJumper: true,
    total: data?.total ?? 0,
    current: data?.current ?? 1,
    pageSize: data?.size ?? 10,
    pageSizeOptions: ['10', '20', '30', '40'],
  };
  return (
    <div className="list-area">
      {(handleBatch?.length || searchList) && (
        <div className="list-topbar">
          {handleBatch?.length && (
            <div className="list-handle">
              {handleBatch.map((v) => (
                <Button type="primary" onClick={v.fn} disabled={!selectedRows?.length}>
                  {v.text}
                </Button>
              ))}
            </div>
          )}
          {searchList && (
            <div className="list-search">
              <SearchForm submit={searchList} formItems={formItems} />
            </div>
          )}
        </div>
      )}
      <div className="list-wrap">
        <Table pagination={paginationCfg} rowSelection={rowSelection} size="small" bordered columns={columns} dataSource={data?.records} loading={pending} rowKey="id" />
      </div>
    </div>
  );
};

export default Index;
