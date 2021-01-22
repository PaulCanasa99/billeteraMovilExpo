import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Activity from './Activity';
import Detalle from './Detalle';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import { Appbar, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const ActividadNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          return (
            <Appbar.Header style={style.appBar}>
              {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} />
              ) : null}
              <Appbar.Content
                titleStyle={{ fontFamily: 'Montserrat-SemiBold' }}
                style={style.appTitle}
                title={scene.route.name}
              />
              {previous ? <Appbar.Action /> : null}
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen name="Tus movimientos" component={Activity} />
      <Stack.Screen name="Detalle" component={Detalle} />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  appBar: {
    backgroundColor: '#222831',
  },
  appTitle: {
    alignItems: 'center',
  },
});
export default ActividadNavigator;
