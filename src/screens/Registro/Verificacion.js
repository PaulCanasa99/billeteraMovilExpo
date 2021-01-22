import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme, Text, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Verificacion = ({ confirmCode }) => {
  const { colors } = useTheme();
  const [code, setCode] = useState('');

  return (
    <View style={style.container}>
      <Text style={style.texto}>
        Ingrese el código que recibió por mensaje de texto.
      </Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={(text) => setCode(text)}
        />
        <Button
          compact
          icon={({ color }) => (
            <MaterialCommunityIcons
              name="arrow-right-thick"
              size={20}
              color={color}
            />
          )}
          style={style.button}
          uppercase={false}
          mode="contained"
          onPress={() => confirmCode(code)}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    borderRadius: 10,
    marginLeft: 10,
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
  },
  texto: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    width: '90%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    marginBottom: '100%',
  },
  input: {
    alignItems: 'center',
    width: '70%',
    borderRadius: 25,
    backgroundColor: '#EEEEEE',
  },
});
export default Verificacion;
