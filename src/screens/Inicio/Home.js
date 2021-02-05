import React, { useContext } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme, Text } from 'react-native-paper';
import { Context } from '../../context/Context';
import { firebase } from '../../firebase/config';

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const { usuario, setUsuario } = useContext(Context);
  const usuariosRef = firebase.firestore().collection('Usuarios');
  useEffect(() => {
    const subscriber = usuariosRef
      .doc(usuario.userId)
      .onSnapshot((documentSnapshot) => {
        setUsuario({ ...usuario, saldo: documentSnapshot.data().saldo });
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  return (
    <View style={style.container}>
      <Text
        style={style.greeting}
      >{`Hola ${usuario.nombres}, tu saldo es:`}</Text>
      <Text style={style.saldo}>{`S/. ${usuario.saldo.toFixed(2)}`}</Text>
      <Button
        style={style.button}
        labelStyle={{ fontFamily: 'Montserrat', fontSize: 24 }}
        uppercase={false}
        mode="contained"
        onPress={() =>
          navigation.navigate('EnviarDinero', { name: 'Enviar dinero' })
        }
      >
        Enviar dinero
      </Button>
      <Button
        style={style.button}
        labelStyle={{ fontFamily: 'Montserrat', fontSize: 24 }}
        uppercase={false}
        mode="contained"
        onPress={() =>
          firebase
            .auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        }
        color={colors.accent}
      >
        Depositar
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 32,
    width: '80%',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Montserrat',
  },
  saldo: {
    fontSize: 48,
    width: '70%',
    textAlign: 'center',
    marginBottom: 80,
    fontFamily: 'Montserrat',
  },
  button: {
    width: '60%',
    marginTop: 50,
    justifyContent: 'center',
    fontFamily: 'Montserrat',
  },
});

export default Home;
