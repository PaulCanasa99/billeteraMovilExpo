import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
let backgroundColor;
const Detalle = ({ navigation, route }) => {
  const { monto, nombres, apellidos, mensaje, fecha, emisor } = route.params;
  const { colors } = useTheme();
  backgroundColor = colors.background;

  return (
    <View style={style.container}>
      <Text style={style.text}>{emisor ? 'Has enviado' : 'Has recibido'}:</Text>
      <Text style={style.monto}>{`S/. ${monto}`}</Text>
      <View style={style.usuarioContainer}>
        <MaterialCommunityIcons name="account-circle" size={65} color="black" />
        <Text style={style.destino}>{`${nombres} ${apellidos}`}</Text>
      </View>
      <View style={style.dataContainer}>
        <MaterialCommunityIcons
          name="calendar-blank"
          size={30}
          color={colors.primary}
        />
        <Text style={style.datos}>
          {format(fecha.toDate(), "EEEE, d 'de' MMMM 'a las' HH:mm", {
            locale: es,
          })}
        </Text>
      </View>
      <View style={style.dataContainer}>
        <MaterialCommunityIcons name="email" size={30} color={colors.primary} />
        <Text style={style.datos}>{mensaje}</Text>
      </View>
      <MaterialCommunityIcons
        style={{ marginTop: 40, marginBottom: 30 }}
        name="check-circle"
        size={100}
        color={colors.primary}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usuarioContainer: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 24,
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
  },
  monto: {
    fontSize: 48,
    width: '80%',
    textAlign: 'center',
    marginBottom: 50,
  },
  destino: {
    fontSize: 24,
    textAlign: 'center',
    width: '70%',
  },
  datos: {
    fontSize: 18,
    width: '70%',
    marginLeft: 15,
  },
});

export default Detalle;
