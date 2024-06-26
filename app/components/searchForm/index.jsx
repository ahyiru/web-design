import {Form, Button} from 'antd';
import {Grid} from '@huxy/components';
import {validObj} from '@huxy/utils';

const rowCfg = {
  gutter: [12, 12],
  style: {
    // justifyContent: 'flex-end',
  },
};

const colCfg = {
  xl: 2,
  lg: 3,
  md: 3,
  sm: 4,
  xs: 6,
};

const SearchForm = props => {
  const {submit, loading, children, handler, initialValues, ...rest} = props;
  const [form] = Form.useForm();
  return (
    <div className="sm-form-style" {...rest}>
      <Form layout="inline" form={form} initialValues={initialValues} onFinish={value => submit(validObj(value))} style={{width: '100%'}}>
        <Grid rowProps={rowCfg} colProps={colCfg}>
          <div itemprops={{style: {flex: '1 0 auto'}, xs: 12}}>{handler}</div>
          {children}
          <div itemprops={{style: {maxWidth: '176px'}}} style={{float: 'right'}}>
            <Button loading={loading} type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{marginLeft: '12px'}} onClick={() => form.resetFields()}>
              重置
            </Button>
          </div>
        </Grid>
      </Form>
    </div>
  );
};

export default SearchForm;
