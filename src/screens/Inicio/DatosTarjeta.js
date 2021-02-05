import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { Context } from '../../context/Context';
import { firebase } from '../../firebase/config';
import { CreditCardInput } from 'react-native-input-credit-card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DatosTarjeta = ({ navigation }) => {
  const { colors } = useTheme();
  const [monto, setMonto] = useState('');
  const { usuario, setUsuario } = useContext(Context);
  const [tarjeta, setTarjeta] = useState();
  const usuariosRef = firebase.firestore().collection('Usuarios');
  const increment = firebase.firestore.FieldValue.increment(parseFloat(monto));
  const onSubmit = () => {
    console.log(tarjeta);
    console.log(monto);
    if (tarjeta.valid)
      usuariosRef
        .doc(usuario.userId)
        .update({ saldo: increment })
        .then(() => {
          navigation.navigate('Home');
        });
  };
  const onChange = (e) => {
    console.log(e);
    setTarjeta(e);
  };
  return (
    <KeyboardAwareScrollView
      style={{
        paddingTop: 60,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <CreditCardInput onChange={onChange} />
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
          returnKeyType="done"
          text
        />
      </View>

      <Button
        labelStyle={{ fontFamily: 'Montserrat', fontSize: 24 }}
        style={style.button}
        uppercase={false}
        mode="contained"
        onPress={onSubmit}
      >
        Confirmar
      </Button>
    </KeyboardAwareScrollView>
  );
};

const style = StyleSheet.create({
  montoContainer: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#00ADB5',
    marginBottom: 20,
    alignSelf: 'center',
  },
  monto: {
    alignSelf: 'center',
    fontFamily: 'Montserrat',
    flex: 1,
    textAlign: 'center',
    marginRight: '10%',
    fontSize: 24,
  },
  button: {
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
});

export default DatosTarjeta;
