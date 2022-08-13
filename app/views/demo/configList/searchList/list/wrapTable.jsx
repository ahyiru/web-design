import {Table} from 'antd';

const Index = props => {
  const {result, pageChange, columns, rowSelection, pagination, ...rest} = props;
  const {isPending, data} = result;
  const {total, current, size, list} = data || {};

  const handlePageChange = (current, size) => {
    pageChange?.(current, size);
  };

  const selectionCfg = rowSelection
    ? {
      columnWidth: '30px',
      // selectedRowKeys: selectedRows.map((v) => v[rowKey]),
      // onChange: (selectedRowKeys, selectedRows) => {
      //   setSelectedRows?.(selectedRows);
      // },
      // getCheckboxProps: (record) => ({
      //   disabled: !profile.role && record[rowKey] !== profile[rowKey],
      // }),
      ...(typeof rowSelection === 'object' ? rowSelection : null),
    }
    : null;

  const paginationCfg =
    pagination === false
      ? false
      : {
        onShowSizeChange: handlePageChange,
        onChange: handlePageChange,
        showSizeChanger: true,
        showQuickJumper: true,
        total: total || 1,
        current: current || 1,
        pageSize: size || 10,
        pageSizeOptions: ['10', '20', '30', '40'],
        size: 'small',
        ...(typeof pagination === 'object' ? pagination : null),
      };

  return <Table pagination={paginationCfg} rowSelection={selectionCfg} columns={columns} dataSource={list ?? []} loading={isPending} size="small" bordered scroll={{x: true}} {...rest} />;
};

export default Index;
