import React from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Linhas from '../components/Linhas';
import Linha from '../components/Linha';
import BtnFavorito from '../components/layout/BtnFavorito';
import { FONTS, COLORS } from '../helpers/theme';
import Config from '../components/Config';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Linhas"
        headerMode="screen"
        screenOptions={{
          headerTintColor: COLORS.THEME,
          headerTitleStyle: {
            fontFamily: FONTS.SEMI_BOLD,
          },
        }}>
        <Stack.Screen name="Linhas" component={Linhas} />
        <Stack.Screen
          name="Linha"
          component={Linha}
          options={{
            headerRight: () => <BtnFavorito />,
            headerTitleStyle: {
              fontSize: 16,
              width: Dimensions.get('window').width - 128,
            },
          }}
        />
        <Stack.Screen name="Configurações" component={Config} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
