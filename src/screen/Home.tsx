import React from 'react';
import {View, Button} from 'react-native';

export const HomeScreen = ({navigation}: any) => {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('SelectProducts')}
        title="Выбрать продукты"
      />
    </View>
  );
};
