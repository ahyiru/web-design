import { tagList } from './configs';

const findTag = selected => {
  if (selected?.length < 2) {
    return '';
  }
  const seltag = tagList().find(tag => tag.values[0] === selected[0] && tag.values[1] === selected[1]);
  return seltag?.label || '';
};

export default findTag;
