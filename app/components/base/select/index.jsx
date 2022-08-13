const Index = ({options, ...rest}) => (
  <select className="select-wrap" style={{cursor: 'pointer'}} {...rest}>
    {options.map(({value, label}) => (
      <option key={value} className="select-item" value={value}>
        {value}
      </option>
    ))}
  </select>
);

export default Index;
