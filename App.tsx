import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {App} from './src';

const Root = () => (
  <NavigationContainer>
    <PaperProvider>
      <App />
    </PaperProvider>
  </NavigationContainer>
);

// eslint-disable-next-line import/no-default-export
export default Root;
