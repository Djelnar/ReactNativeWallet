// eslint-disable-next-line import/no-duplicates
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {App} from './src';

const Root = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <PaperProvider>
        <App />
      </PaperProvider>
    </NavigationContainer>
  </GestureHandlerRootView>
);

// eslint-disable-next-line import/no-default-export
export default Root;
