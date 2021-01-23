import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, useTheme, Text } from 'react-native-paper';
import { firebase } from '../../firebase/config';
import { useState } from 'react';
import { Context } from '../../context/Context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Registro = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const { setUsuario } = useContext(Context);
  const usuariosRef = firebase.firestore().collection('Usuarios');
  const register = () => {
    setUsuario({
      nombres: nombres,
      apellidos: apellidos,
      email: email,
      dni: dni,
      celular: phoneNumber,
      saldo: 0,
    });
    usuariosRef.add({
      nombres: nombres,
      apellidos: apellidos,
      email: email,
      dni: dni,
      celular: phoneNumber,
      saldo: 0,
    });
    navigation.navigate('App');
  };

  const { colors } = useTheme();
  return (
    <KeyboardAwareScrollView
      style={{ paddingTop: 60 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={style.container}>
        <View style={style.inputContainer}>
          <Text style={{ color: colors.primary, fontFamily: 'Montserrat' }}>
            Nombres:
          </Text>
          <TextInput
            type="outlined"
            style={style.input}
            textContentType="name"
            onChangeText={(text) => setNombres(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={{ color: colors.primary, fontFamily: 'Montserrat' }}>
            Apellidos:
          </Text>
          <TextInput
            type="outlined"
            style={style.input}
            textContentType="familyName"
            onChangeText={(text) => setApellidos(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={{ color: colors.primary, fontFamily: 'Montserrat' }}>
            Correo electrónico:
          </Text>
          <TextInput
            type="outlined"
            style={style.input}
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={{ color: colors.primary, fontFamily: 'Montserrat' }}>
            Documento de identidad (DNI):
          </Text>
          <TextInput
            type="outlined"
            style={style.input}
            keyboardType="numeric"
            onChangeText={(text) => setDni(text)}
          />
        </View>
        <Button
          labelStyle={{ fontFamily: 'Montserrat', fontSize: 24 }}
          style={style.button}
          uppercase={false}
          mode="contained"
          onPress={register}
        >
          Confirmar
        </Button>
      </View>
    </KeyboardAwareScrollView>
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
  },
  input: {
    fontFamily: 'Montserrat',
    borderBottomColor: '#00ADB5',
    borderBottomWidth: 1,
    marginBottom: 10,
    height: 40,
  },
  inputContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    marginBottom: 45,
  },
});

export default Registro;
