import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import EnviarDinero from './EnviarDinero';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import RealizarEnvio from './RealizarEnvio';
import EnvioExitoso from './EnvioExitoso';

const InicioNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <CustomNavigationBar {...props} /> }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen name="EnviarDinero" component={EnviarDinero} />
      <Stack.Screen name="RealizarEnvio" component={RealizarEnvio} />
      <Stack.Screen name="EnvioExitoso" component={EnvioExitoso} />
    </Stack.Navigator>
  );
};
export default InicioNavigator;
