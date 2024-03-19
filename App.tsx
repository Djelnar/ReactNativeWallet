// eslint-disable-next-line import/no-duplicates
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {App} from './src';
import {LoginProvider} from './src/shared/use-login';

const Root = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <PaperProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

// eslint-disable-next-line import/no-default-export
export default Root;
