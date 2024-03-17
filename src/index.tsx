import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Main} from './screens/main';
import {Onboard} from './screens/onboard';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootParamsList = {
  Onboard: undefined;
  Main: {
    key: string;
  };
};

const Stack = createNativeStackNavigator<RootParamsList>();

export function App(): React.JSX.Element {
  const theme = useTheme();
  const backgroundColor = theme.colors.background;

  return (
    <SafeAreaView style={{backgroundColor, flex: 1}}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Onboard"
          component={Onboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
