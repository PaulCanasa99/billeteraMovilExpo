import * as React from 'react';
import InicioNavigator from './Inicio/InicioNavigator';
import EventosNavigator from './Eventos/EventosNavigator';
import Groups from './Grupos/Groups';
import ActividadNavigator from './Actividad/ActividadNavigator';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Navigator = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      shifting={false}
      activeColor="#222831"
      inactiveColor="#EEEEEE"
    >
      <Tab.Screen
        name="Home"
        component={InicioNavigator}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-cash"
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EventosNavigator"
        component={EventosNavigator}
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-today"
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: 'Grupos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActividadNavigator}
        options={{
          tabBarLabel: 'Actividad',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="compare-horizontal"
              color={color}
              size={22}
            />
          ),
        }}
      />
      {/* <Tab.Screen
      name="More"
      component={PhoneSignIn}
      options={{
        tabBarLabel: 'Más',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="more" color={color} size={22} />
        ),
      }}
    /> */}
    </Tab.Navigator>
  );
};
export default Navigator;
