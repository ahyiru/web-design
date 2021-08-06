export const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
export const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};