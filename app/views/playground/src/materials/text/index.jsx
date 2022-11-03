import {materials} from '@huxy/components';
import objs from '@app/models/objs';

const {Text3d, TextFilter, TextLoading, TextMasked} = materials;

const box = {
  position: 'relative',
  minHeight: '100px',
  margin: '20px auto',
  background: 'rgba(0, 0, 0, 0.1)',
  padding: '15px',
};

const Index = props => {
  return (
    <div>
      <div style={box}>
        <Text3d list={objs} />
      </div>
      <div style={box}>
        <TextFilter>Css materials</TextFilter>
      </div>
      <div style={box}>
        <TextLoading>Loading</TextLoading>
      </div>
      <div style={box}>
        <TextMasked>当我们在写代码时，其实我们都在写一个故事，而场景就是故事中的每一个片段。</TextMasked>
      </div>
    </div>
  );
};

export default Index;
