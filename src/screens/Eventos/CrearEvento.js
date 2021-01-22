import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Button, useTheme, Text } from 'react-native-paper';
import { firebase } from '../../firebase/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Context } from '../../context/Context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CrearEvento = ({ navigation }) => {
  const { colors } = useTheme();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const { usuario } = useContext(Context);
  const eventosRef = firebase.firestore().collection('Eventos');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const Crear = () => {
    eventosRef
      .add({
        organizadorId: usuario.userId,
        organizadorNombres: usuario.nombres,
        organizadorApellidos: usuario.apellidos,
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio),
        fecha: date,
      })
      .then(() => {
        navigation.navigate('Tus eventos');
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={style.container}>
        <Image
          style={style.imagen}
          source={{
            uri:
              'https://www.bbva.com/wp-content/uploads/2017/08/bbva-balon-futbol-2017-08-11-1024x622.jpg',
          }}
        />
        <View style={style.inputContainer}>
          <Text
            style={{ fontFamily: 'Montserrat-SemiBold', color: colors.primary }}
          >
            Nombre del evento:
          </Text>
          <TextInput
            type="outlined"
            style={style.input}
            onChangeText={(text) => setNombre(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <Text
            style={{ fontFamily: 'Montserrat-SemiBold', color: colors.primary }}
          >
            Descripción:
          </Text>
          <TextInput
            type="outlined"
            style={style.input}
            onChangeText={(text) => setDescripcion(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <Text
            style={{ fontFamily: 'Montserrat-SemiBold', color: colors.primary }}
          >
            Precio por persona:
          </Text>
          <TextInput
            type="outlined"
            style={style.input}
            textContentType="emailAddress"
            keyboardType="number-pad"
            onChangeText={(text) => setPrecio(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <View style={style.fecha}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: colors.primary,
                flexGrow: 1,
              }}
            >
              Fecha y hora:
            </Text>
            <MaterialCommunityIcons
              onPress={showDatepicker}
              name="calendar-outline"
              size={20}
              color={colors.primary}
            />
            <MaterialCommunityIcons
              onPress={showTimepicker}
              name="clock-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <Text style={style.date}>
            {format(date, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })}
          </Text>
        </View>

        {show && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}
        <Button
          style={style.button}
          uppercase={false}
          mode="contained"
          onPress={Crear}
        >
          Crear evento
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
    marginVertical: 20,
  },
  date: {
    borderBottomColor: '#00ADB5',
    borderBottomWidth: 1,
    marginVertical: 10,
    height: 30,
  },
  input: {
    borderBottomColor: '#00ADB5',
    borderBottomWidth: 1,
    marginBottom: 10,
    height: 40,
  },
  inputContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '90%',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    marginBottom: 25,
  },
  imagen: {
    width: '100%',
    height: 175,
    marginBottom: 20,
    resizeMode: 'stretch',
  },
  fecha: {
    flexDirection: 'row',
  },
});

export default CrearEvento;
