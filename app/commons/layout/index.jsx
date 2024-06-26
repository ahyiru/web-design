import {StrictMode} from 'react';
import UiI18n from './components/uiI18n';
import Layout from './layout';

const Index = props => (
  <StrictMode>
    <UiI18n>
      <Layout {...props} />
    </UiI18n>
  </StrictMode>
);

export default Index;
