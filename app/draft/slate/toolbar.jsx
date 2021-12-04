import { useCallback, useMemo, useState } from 'react';

import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate';

import { Button, Icon, Toolbar } from './components';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const RichTextExample = () => {

  return <Toolbar>
    <MarkButton format="bold" icon="format_bold" />
    <MarkButton format="italic" icon="format_italic" />
    <MarkButton format="underline" icon="format_underlined" />
    <MarkButton format="code" icon="code" />
    <BlockButton format="heading-one" icon="looks_one" />
    <BlockButton format="heading-two" icon="looks_two" />
    <BlockButton format="block-quote" icon="format_quote" />
    <BlockButton format="numbered-list" icon="format_list_numbered" />
    <BlockButton format="bulleted-list" icon="format_list_bulleted" />
  </Toolbar>;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type,
      ),
    split: true,
  });
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
  case 'block-quote':
    return <blockquote {...attributes}>{children}</blockquote>;
  case 'bulleted-list':
    return <ul {...attributes}>{children}</ul>;
  case 'heading-one':
    return <h1 {...attributes}>{children}</h1>;
  case 'heading-two':
    return <h2 {...attributes}>{children}</h2>;
  case 'list-item':
    return <li {...attributes}>{children}</li>;
  case 'numbered-list':
    return <ol {...attributes}>{children}</ol>;
  default:
    return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default RichTextExample;




/* const renderElement = useCallback(props => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />
    default:
      return <DefaultElement {...props} />
  }
}, []) */
































