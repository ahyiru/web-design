import styles from './keyword.less';
export const Keyword = props => {
  const {raw, keyword, className = ''} = props;
  if (keyword) {
    const regex = new RegExp(keyword, 'ig');
    const arr = raw.split(regex);
    const cls = className ? `${styles.keywordWrapper} ${className}` : styles.keywordWrapper;
    return (
      <span className={cls}>
        {arr.map((section, index) =>
          index !== arr.length - 1 ? (
            <span key={section + index}>
              {section}
              <strong>{keyword}</strong>
            </span>
          ) : (
            section
          ),
        )}
      </span>
    );
  }
  return null;
};
