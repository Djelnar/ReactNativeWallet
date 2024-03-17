import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {RootParamsList} from '../..';

export function Main({route}: NativeStackScreenProps<RootParamsList, 'Main'>) {
  return (
    <View>
      <Text>{route.params.key}</Text>
    </View>
  );
}
