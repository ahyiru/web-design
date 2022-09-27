import {useState} from 'react';

const Index = ({options, name, value, onChange, ...rest}) => {
  const [selected, setSelected] = useState(typeof value === 'string' ? [value] : value);
  return (
    <select className="select-wrap" name={name} {...rest}>
      {options.map(({key, value}) => (
        <option
          key={key}
          className="select-item"
          onClick={e => {
            e.stopPropagation();
            const index = selected.indexOf(value);
            let newSel = [];
            if (index === -1) {
              newSel = [...selected, value];
            } else {
              newSel.splice(index, 1);
            }
            setSelected(newSel);
            onChange?.(newSel);
          }}
          value={value}
          selected={selected.includes(value)}
        >
          <span>{value}</span>
        </option>
      ))}
    </select>
  );
};

export default Index;
