const Index = ({options, value: selected, onChange, style, ...rest}) => {
  selected = typeof selected === 'string' ? [selected] : [...(selected || [])];
  return (
    <div className="checkbox-wrap" style={{display: 'flex'}}>
      {(options || []).map(({value, label}) => (
        <div
          key={value}
          className="checkbox-item"
          onClick={e => {
            e.stopPropagation();
            const index = selected.indexOf(value);
            index === -1 ? selected.push(value) : selected.splice(index, 1);
            onChange?.(selected, e);
          }}
          style={{display: 'flex', alignItems: 'center', marginRight: '12px', cursor: 'pointer'}}
        >
          <input style={{...style, cursor: 'pointer'}} type="checkbox" value={value} checked={selected.includes(value)} readOnly aria-label={label || value} {...rest} />
          <span style={{marginLeft: '6px'}}>{label || value}</span>
        </div>
      ))}
    </div>
  );
};

export default Index;
