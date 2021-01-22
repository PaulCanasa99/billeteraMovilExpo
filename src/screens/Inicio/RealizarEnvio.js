import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, useTheme, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context } from '../../context/Context';
import { firebase } from '../../firebase/config';
let backgroundColor;
const RealizarEnvio = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const { colors } = useTheme();
  backgroundColor = colors.background;
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState();
  const { usuario, setUsuario } = useContext(Context);
  const [destino, setDestino] = useState();
  const increment = firestore.FieldValue.increment(parseFloat(monto));
  const decrement = firestore.FieldValue.increment(parseFloat(monto) * -1);
  const usuariosRef = firebase.firestore().collection('Usuarios');
  const transaccionesRef = firebase.firestore().collection('Transacciones');
  useEffect(() => {
    if (phoneNumber)
      usuariosRef
        .where('celular', '==', phoneNumber.replace(/\s/g, ''))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            setDestino({
              ...documentSnapshot.data(),
              userId: documentSnapshot.id,
            });
          });
        });
  }, []);
  const enviar = () => {
    usuariosRef
      .doc(usuario.userId)
      .update({ saldo: decrement })
      .then(() => {
        console.log('user updated');
      });
    usuariosRef
      .doc(destino.userId)
      .update({ saldo: increment })
      .then(() => {
        console.log('destino updated');
      });
    transaccionesRef.add({
      emisor: usuario.userId,
      emisorNombres: usuario.nombres,
      emisorApellidos: usuario.apellidos,
      destino: destino.userId,
      destinoNombres: destino.nombres,
      destinoApellidos: destino.apellidos,
      fecha: firestore.FieldValue.serverTimestamp(),
      mensaje: mensaje,
      monto: parseFloat(monto),
    });
    navigation.navigate('EnvioExitoso', {
      name: 'Envío exitoso',
      monto: monto,
      destino: destino,
      mensaje: mensaje,
      fecha: new Date(),
    });
  };
  if (destino)
    return (
      <View style={style.container}>
        <Text style={style.text}>Enviando dinero a:</Text>
        <MaterialCommunityIcons
          name="account-circle"
          size={100}
          color="black"
        />

        <Text
          style={style.destino}
        >{`${destino.nombres} ${destino.apellidos}`}</Text>
        <View style={style.montoContainer}>
          <MaterialCommunityIcons
            name="bitcoin"
            size={30}
            color={colors.primary}
          />
          <TextInput
            style={style.monto}
            value={monto}
            onChangeText={(monto) => setMonto(monto)}
            placeholder="0.00"
            keyboardType="numeric"
            text
          />
        </View>

        <View style={style.mensajeContainer}>
          <MaterialCommunityIcons
            name="email"
            size={30}
            color="black"
            color={colors.primary}
          />

          <TextInput
            underlineColor={colors.background}
            selectionColor={colors.background}
            theme={{ roundness: 0 }}
            style={style.mensaje}
            value={mensaje}
            onChangeText={(mensaje) => setMensaje(mensaje)}
            placeholder="Escriba un mensaje"
          />
        </View>

        <Button
          style={style.button}
          uppercase={false}
          mode="contained"
          onPress={enviar}
        >
          Enviar
        </Button>
      </View>
    );
  return null;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mensajeContainer: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#00ADB5',
  },
  montoContainer: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#00ADB5',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    width: '80%',
    textAlign: 'center',
    marginBottom: 30,
  },
  destino: {
    fontSize: 24,
    width: '70%',
    textAlign: 'center',
    marginBottom: 60,
    marginTop: 30,
  },
  button: {
    marginTop: 40,
    width: '60%',
    justifyContent: 'center',
  },
  monto: {
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    textAlign: 'center',
    marginRight: '10%',
    fontSize: 24,
    backgroundColor: backgroundColor,
  },
  mensaje: {
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    textAlign: 'center',
    marginRight: '10%',
    fontSize: 18,
    backgroundColor: backgroundColor,
  },
});

export default RealizarEnvio;
