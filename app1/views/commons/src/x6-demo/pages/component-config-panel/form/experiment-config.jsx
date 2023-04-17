import {useEffect} from 'react';
import {Form, Input, Radio} from 'antd';
import {useObservableState} from '../../../common/hooks/useObservableState';
import {useExperimentGraph} from '../../rx-models/experiment-graph';
export const ExperimentForm = ({experimentId, name}) => {
  const [form] = Form.useForm();
  const expGraph = useExperimentGraph(experimentId);
  const [activeExperiment] = useObservableState(expGraph.experiment$);
  const onValuesChange = ({experimentName}) => {
    expGraph.experiment$.next({...activeExperiment, name: experimentName});
  };
  useEffect(() => {
    form.setFieldsValue({
      experimentName: activeExperiment ? activeExperiment.name : '',
    });
  }, [activeExperiment]);
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        experimentName: activeExperiment ? activeExperiment.name : '',
      }}
      onValuesChange={onValuesChange}
      requiredMark={false}
    >
      <Form.Item name="experimentName" label="实验名称">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label={name}>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field C">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field D">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="RadioDemo">
        <Radio.Group>
          <Radio.Button value="optional">Optional</Radio.Button>
          <Radio.Button value={true}>Required</Radio.Button>
          <Radio.Button value={false}>Hidden</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
