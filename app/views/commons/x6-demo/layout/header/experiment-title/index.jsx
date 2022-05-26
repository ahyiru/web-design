import css from './index.less';
export const ExperimentTitle = ({ experimentName }) => {
  return (<div className={css.wrap}>
    <span className={css.name}> {experimentName} </span>
  </div>);
};
