import {Row as DefRow, Col as DefCol} from '@huxy/components';

/* const rowCfg={
  gutter:[10,10],
}; */
const styles = {
  // '--gutter': 'calc(var(--frame-spacing) / 2)',
  // '--rowgap': 'calc(var(--frame-spacing) / 2)',
};

const colCfg = {
  sm: 12,
  xs: 12,
};

export const Row = ({children, style, ...rest}) => (
  <DefRow style={{...styles, ...style}} {...rest}>
    {children}
  </DefRow>
);

export const Col = ({children, ...rest}) => (
  <DefCol {...colCfg} {...rest}>
    {children}
  </DefCol>
);
