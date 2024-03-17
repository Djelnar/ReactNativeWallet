import {PaperProvider} from 'react-native-paper';
import {App} from './src';

const Root = () => (
  <PaperProvider>
    <App />
  </PaperProvider>
);

// eslint-disable-next-line import/no-default-export
export default Root;
