import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Button, useTheme, Text } from 'react-native-paper';
import { firebase } from '../../firebase/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Context } from '../../context/Context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  const handleConfirm = (date) => {
    setDate(date);
    setShow(false);
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
          <Text style={{ fontFamily: 'Montserrat', color: colors.primary }}>
            Nombre del evento:
          </Text>
          <TextInput
            placeholder="Nombre del evento"
            type="outlined"
            style={style.input}
            onChangeText={(text) => setNombre(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={{ fontFamily: 'Montserrat', color: colors.primary }}>
            Descripción:
          </Text>
          <TextInput
            placeholder="Descripción"
            type="outlined"
            style={style.input}
            onChangeText={(text) => setDescripcion(text)}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={{ fontFamily: 'Montserrat', color: colors.primary }}>
            Precio por persona:
          </Text>
          <TextInput
            placeholder="Precio"
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
              onPress={() => setShow(true)}
              style={{
                fontFamily: 'Montserrat',
                color: colors.primary,
                flexGrow: 1,
              }}
            >
              Fecha y hora:
            </Text>

            <MaterialCommunityIcons
              onPress={() => setShow(true)}
              name="calendar-outline"
              size={20}
              color={colors.primary}
            />
            <MaterialCommunityIcons
              onPress={() => setShow(true)}
              name="clock-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <Text style={style.date}>
            {format(date, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })}
          </Text>
        </View>

        {/* {show && (
          <DateTimePicker
            style={{ width: '80%' }}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )} */}
        <DateTimePickerModal
          minimumDate={new Date()}
          isVisible={show}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={() => setShow(false)}
        />
        <Button
          labelStyle={{ fontFamily: 'Montserrat', fontSize: 24 }}
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
    marginVertical: 20,
  },
  date: {
    fontFamily: 'Montserrat',
    marginVertical: 10,
    height: 30,
    borderBottomColor: '#00ADB5',
    borderBottomWidth: 1,
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
