const Index=({attributes,children,element})=>{
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

export default Index;