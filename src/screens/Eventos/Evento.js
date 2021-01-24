import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, useTheme, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context } from '../../context/Context';
import { firebase } from '../../firebase/config';

const Evento = ({ navigation, route }) => {
  const { colors } = useTheme();
  const {
    descripcion,
    precio,
    eventoId,
    organizadorId,
    nombre,
    invitados,
    participantes,
  } = route.params;
  const { usuario } = useContext(Context);

  return (
    <ScrollView>
      <View style={style.container}>
        <Image
          style={style.imagen}
          source={{
            uri:
              'https://www.bbva.com/wp-content/uploads/2017/08/bbva-balon-futbol-2017-08-11-1024x622.jpg',
          }}
        />
        <View
          style={{ ...style.textContainer, borderBottomColor: colors.primary }}
        >
          <Text style={{ fontSize: 18, fontFamily: 'Montserrat' }}>
            Descripción:
          </Text>
          <Text style={{ fontSize: 12, fontFamily: 'Montserrat' }}>
            {descripcion}
          </Text>
        </View>
        <View
          style={{
            ...style.precioContainer,
            borderBottomColor: colors.primary,
          }}
        >
          <Text style={{ fontSize: 18, flexGrow: 1, fontFamily: 'Montserrat' }}>
            Precio por persona:
          </Text>
          <Text style={{ fontFamily: 'MontserratSemiBold', fontSize: 18 }}>
            {`S/. ${precio.toFixed(2)}`}
          </Text>
        </View>
        <View
          style={{
            ...style.precioContainer,
            borderBottomColor: colors.primary,
          }}
        >
          <Text style={{ fontSize: 18, flexGrow: 1, fontFamily: 'Montserrat' }}>
            Ver participantes
          </Text>
          <View style={style.participantes}>
            <MaterialCommunityIcons
              style={style.icon}
              name="account"
              color="black"
              size={24}
              onPress={() => {
                navigation.navigate('Participantes', {
                  invitados: invitados,
                  participantes: participantes,
                });
              }}
            />
            {/* <MaterialCommunityIcons
              style={style.icon}
              name="account"
              color="black"
              size={24}
            />
            <MaterialCommunityIcons
              style={style.icon}
              name="account"
              color="black"
              size={24}
            />
            <MaterialCommunityIcons
              style={style.icon}
              name="account"
              color="black"
              size={24}
            /> */}
          </View>
        </View>
        <View
          style={{
            ...style.precioContainer,
            borderBottomColor: colors.primary,
          }}
        >
          <Text style={{ fontSize: 18, flexGrow: 1, fontFamily: 'Montserrat' }}>
            Invitar personas
          </Text>
          <MaterialCommunityIcons
            name="account-plus"
            color="black"
            size={26}
            onPress={() =>
              navigation.navigate('Agregar Participantes', {
                eventoId: eventoId,
              })
            }
          />
        </View>
        {organizadorId !== usuario.userId && (
          <Button
            labelStyle={{
              fontSize: 24,
              fontFamily: 'Montserrat',
            }}
            style={style.button}
            uppercase={false}
            mode="contained"
            onPress={() =>
              navigation.navigate('Confirmar participación', {
                name: 'Confirmar participación',
                organizadorId: organizadorId,
                nombre: nombre,
                precio: precio,
                eventoId: eventoId,
              })
            }
          >
            Participar
          </Button>
        )}
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '60%',
    justifyContent: 'center',
    marginVertical: 40,
  },
  participantes: {
    flexDirection: 'row-reverse',
    flexGrow: 0.5,
  },
  textContainer: {
    paddingVertical: 18,
    paddingHorizontal: 5,
    width: '90%',
    borderBottomWidth: 1,
  },
  precioContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 5,
    width: '90%',
    borderBottomWidth: 1,
  },
  imagen: {
    width: '100%',
    height: 175,
    resizeMode: 'stretch',
  },
  icon: {
    marginLeft: 30,
  },
});

export default Evento;
