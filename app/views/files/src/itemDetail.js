import {useState, useEffect} from 'react';
import apis from './getApis';

import {header} from './configs';

const ItemDetail = ({path, filename}) => {
  const [details, setDetails] = useState({filename});
  useEffect(() => {
    const getDetails = async () => {
      const {result} = await apis.readfileFn({path});
      setDetails({filename, ...result});
    };
    getDetails();
  }, []);
  return (
    <div style={{padding: '0 10px'}}>
      {header.map(({key, label, flex, format}) => (
        <div key={key} style={{padding: '4px 0'}}>
          <span style={{width: '33.33%', textAlign: 'left', display: 'inline-block'}}>{label}：</span>
          <span>{format ? format(details[key]) : details[key]}</span>
        </div>
      ))}
    </div>
  );
};

export default ItemDetail;
