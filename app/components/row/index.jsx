import {components} from '@common';

const {Row:DefRow,Col:DefCol}=components;

const rowCfg={
  gutter:[10,10],
};

const colCfg={
  sm:12,
  xs:12,
};

export const Row=({children,...rest})=><DefRow {...rowCfg} {...rest}>{children}</DefRow>;

export const Col=({children,...rest})=><DefCol {...colCfg} {...rest}>{children}</DefCol>;


