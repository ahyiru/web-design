import { ApartmentOutlined } from '@ant-design/icons';
import css from './index.less';
export const SimpleLogo = ({ border }) => {
  return (<div className={css.root}>
    <ApartmentOutlined className={css.logo}/>
  </div>);
};
