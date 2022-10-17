export const DefaultElement = ({attributes, children, ...rest}) => <div {...attributes} {...rest}>{children}</div>;

export const H1 = ({attributes, children}) => <h1 {...attributes}>{children}</h1>;
export const H2 = ({attributes, children}) => <h2 {...attributes}>{children}</h2>;
export const Ol = ({attributes, children}) => <ol {...attributes}>{children}</ol>;
export const Ul = ({attributes, children}) => <ul {...attributes}>{children}</ul>;
export const Li = ({attributes, children}) => <li {...attributes}>{children}</li>;
export const Bold = ({attributes, children}) => <b {...attributes}>{children}</b>;
export const Italic = ({attributes, children}) => <i {...attributes}>{children}</i>;
export const Underline = ({attributes, children}) => <u {...attributes}>{children}</u>;
export const Strikethrough = ({attributes, children}) => <s {...attributes}>{children}</s>;
export const Quote = ({attributes, children}) => <blockquote {...attributes}>{children}</blockquote>;
export const Code = ({attributes, children}) => <code {...attributes}>{children}</code>;

export const Link = ({attributes, children, element}) => (
  <a {...attributes} href={element.url}>
    {children}
  </a>
);
export const Image = ({attributes, children, element}) => (
  <div {...attributes}>
    <div contentEditable={false}>
      <img src={element.url} alt={element.alt} />
    </div>
    {children}
  </div>
);

export const Table = ({attributes, children}) => (
  <table>
    <tbody {...attributes}>{children}</tbody>
  </table>
);
export const TableRow = ({attributes, children}) => <tr {...attributes}>{children}</tr>;
export const TableCell = ({attributes, children}) => <td {...attributes}>{children}</td>;
