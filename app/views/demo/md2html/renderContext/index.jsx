import {useEffect, useState} from 'react';
import {components} from '@common';
import getContext from '../getFiles/getContext';
import replacePath from '../getFiles/replacePath';

import marked from './marked';

const {Spinner, str2React} = components;

const Index = ({item}) => {
  const [context, setContext] = useState('');
  useEffect(() => {
    const getMd = async () => {
      try {
        const context = await getContext({...item, type: '.md'});
        const newContext = await replacePath(context, item);
        setContext(marked(newContext));
      } catch (err) {
        setContext(err?.message);
      }
    };
    getMd();
  }, []);

  return (
    <div className="content">
      {str2React(context)}
      {!context && <Spinner global />}
    </div>
  );
};

export default Index;
