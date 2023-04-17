import {unescapeHTML} from '@huxy/utils';
import {Cut} from './cut';
import {Keyword} from './keyword';
export const ItemName = props => {
  const {data} = props;
  const {keyword, cutParas = {}} = data;
  const name = unescapeHTML(data.name);
  const {max, side} = cutParas;
  if (keyword) {
    return <Keyword raw={name} keyword={keyword} />;
  }
  if (max) {
    return (
      <Cut max={max} left={side} right={side}>
        {name}
      </Cut>
    );
  }
  return <span>{name}</span>;
};
