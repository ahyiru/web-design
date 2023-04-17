import {Editor, Transforms, Element} from 'slate';

const LIST_TYPES = ['ul', 'ol'];

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
    split: true,
  });
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'li' : format,
  };
  Transforms.setNodes(editor, newProperties);
  if (!isActive && isList) {
    const block = {type: format, children: []};
    Transforms.wrapNodes(editor, block);
  }
};

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  });
  return !!match;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
