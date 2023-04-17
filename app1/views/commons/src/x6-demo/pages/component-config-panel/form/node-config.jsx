import {Form, Input} from 'antd';
import {useObservableState} from '../../../common/hooks/useObservableState';
import {useExperimentGraph} from '../../rx-models/experiment-graph';

export const NodeFormDemo = ({name, nodeId, experimentId}) => {
  const [form] = Form.useForm();
  const expGraph = useExperimentGraph(experimentId);
  const [node] = useObservableState(() => expGraph.activeNodeInstance$);
  const onValuesChange = async ({name}) => {
    if (node.name !== name) {
      await expGraph.renameNode(nodeId, name);
    }
  };
  return (
    <Form form={form} layout="vertical" initialValues={{name: node ? node.name : ''}} onValuesChange={onValuesChange} requiredMark={false}>
      <Form.Item label="节点名称" name="name">
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
    </Form>
  );
};
