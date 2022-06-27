import {unescapeHTML} from '@huxy/utils';
import {Cut} from '@app/views/commons/x6-demo/component/cut';
import {Keyword} from '@app/views/commons/x6-demo/component/keyword';
export const ItemName = (props) => {
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
