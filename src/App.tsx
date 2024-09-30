import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import PaseListaScreen from './PaseListaScreen'; // Nueva pantalla que se abrirá
import TableScreen from './TableScreen'; // Pantalla con la tabla

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TableScreen">
        <Stack.Screen name="TableScreen" component={TableScreen} options={{ title: 'Tabla de Usuarios' }} />
        <Stack.Screen name="PaseListaScreen" component={PaseListaScreen} options={{ title: 'Pase de Lista' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
