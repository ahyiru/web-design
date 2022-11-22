import {Text3d} from '@huxy/materials';
import objs from '@app/models/objs';

const Index = props => {
  return (
    <div>
      <Text3d list={objs} width="400px" {...props} />
    </div>
  );
};

export default Index;
