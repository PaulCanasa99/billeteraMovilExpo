import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TusEventos from './TusEventos';
import Evento from './Evento';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import CrearEvento from './CrearEvento';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import AgregarParticipantes from './AgregarParticipantes';

const EventosNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          return (
            <Appbar.Header style={style.appBar}>
              {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} />
              ) : (
                <Appbar.Action />
              )}
              <Appbar.Content
                titleStyle={{ fontFamily: 'Montserrat-SemiBold' }}
                style={style.appTitle}
                title={
                  scene.route.name === 'Evento'
                    ? scene.route.params.nombre
                    : scene.route.name
                }
                subtitle={
                  scene.route.name === 'Evento' &&
                  format(
                    scene.route.params.fecha.toDate(),
                    "EEEE, d 'de' MMMM 'a las' HH:mm",
                    { locale: es }
                  )
                }
              />
              {scene.route.name === 'Tus eventos' ? (
                <Appbar.Action
                  icon="plus"
                  size={35}
                  onPress={() => {
                    navigation.navigate('Crear evento');
                  }}
                />
              ) : (
                <Appbar.Action />
              )}
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen name="Tus eventos" component={TusEventos} />
      <Stack.Screen name="Crear evento" component={CrearEvento} />
      <Stack.Screen name="Evento" component={Evento} />
      <Stack.Screen
        name="Agregar Participantes"
        component={AgregarParticipantes}
      />
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
export default EventosNavigator;
