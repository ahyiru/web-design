const Index = ({options, name, value: checked, onChange, ...rest}) => (
  <div className="radio-wrap" {...rest} style={{display: 'flex'}}>
    {options.map(({value, label}) => (
      <div key={value} className="radio-item" onClick={e => onChange?.(value, e)} style={{display: 'flex', alignItems: 'center', marginRight: '12px', cursor: 'pointer'}}>
        <input type="radio" name={name} value={value} checked={value === checked} readOnly />
        <span style={{marginLeft: '6px'}}>{value}</span>
      </div>
    ))}
  </div>
);

export default Index;
