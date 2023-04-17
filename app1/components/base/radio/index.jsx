const Index = ({options, value: checked, onChange, style, ...rest}) => (
  <div className="radio-wrap" style={{display: 'flex'}}>
    {(options || []).map(({value, label}) => (
      <div key={value} className="radio-item" onClick={e => onChange?.(value, e)} style={{display: 'flex', alignItems: 'center', marginRight: '12px', cursor: 'pointer'}}>
        <input style={{...style, cursor: 'pointer'}} type="radio" value={value} checked={value === checked} readOnly aria-label={label || value} {...rest} />
        <span style={{marginLeft: '6px'}}>{label || value}</span>
      </div>
    ))}
  </div>
);

export default Index;
