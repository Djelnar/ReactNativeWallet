import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Onboard} from './screens/onboard';

export function App(): React.JSX.Element {
  const theme = useTheme();
  const backgroundColor = theme.colors.background;

  return (
    <SafeAreaView style={{backgroundColor, flex: 1}}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <Onboard />
    </SafeAreaView>
  );
}
