import {useSlate} from 'slate-react';
import Icon from './icon';
import {toggleBlock, toggleMark, isBlockActive, isMarkActive} from './toggle';

const Index = props => {
  const editor = useSlate();
  if (props.formatType === 'mark') {
    return <Icon {...props} active={isMarkActive(editor, props.format)} onClick={() => toggleMark(editor, props.format)} />;
  }
  return <Icon {...props} active={isBlockActive(editor, props.format)} onClick={() => toggleBlock(editor, props.format)} />;
};

export default Index;
