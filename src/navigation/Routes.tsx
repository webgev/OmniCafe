import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen, SelectProducts} from 'screen';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: 'Главная'}}
        />
        <Stack.Screen
          name="SelectProducts"
          component={SelectProducts}
          options={({route}) => {
            return {
              title: route.params?.headerTitle,
              animationEnabled: false,
              headerLeft: null,
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
