import React, { useEffect, useState, useContext } from 'react';
import { Button, useTheme, List } from 'react-native-paper';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Context } from '../../context/Context';

const TusEventos = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const [eventos, setEventos] = useState([]);
  const { usuario } = useContext(Context);
  const eventosRef = firebase.firestore().collection('Eventos');

  useEffect(() => {
    const movimientos = [];
    eventosRef
      .where('organizadorId', '==', usuario.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          movimientos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });
    eventosRef
      .where('invitados', 'array-contains', usuario.celular)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          movimientos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });
    eventosRef
      .where('participantes', 'array-contains', usuario.celular)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          movimientos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        movimientos.sort((a, b) => a.fecha.toDate() - b.fecha.toDate());
        setEventos(movimientos);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={style.container}>
      <View
        style={{ ...style.buttonsContainer, borderBottomColor: colors.primary }}
      >
        <Button
          labelStyle={{ fontFamily: 'Montserrat', fontSize: 20 }}
          color="white"
          style={{
            ...style.proximos,
            backgroundColor: colors.primary,
          }}
          uppercase={false}
        >
          Próximos
        </Button>
        <Button
          labelStyle={{ fontFamily: 'Montserrat', fontSize: 20 }}
          color={colors.text}
          style={style.antiguos}
          uppercase={false}
        >
          Antiguos
        </Button>
      </View>
      <ScrollView>
        {eventos &&
          eventos.map((item) => {
            return (
              <List.Item
                key={item.key}
                left={() => <List.Icon icon="account" />}
                style={{ ...style.listItem, borderBottomColor: colors.primary }}
                title={item.nombre}
                titleStyle={{
                  fontSize: 18,
                  color: colors.text,
                  fontFamily: 'Montserrat',
                }}
                description={format(
                  item.fecha.toDate(),
                  "EEEE, d 'de' MMMM HH:mm",
                  { locale: es }
                )}
                descriptionStyle={{
                  fontSize: 18,
                  color: colors.text,
                  fontFamily: 'Montserrat',
                }}
                onPress={() =>
                  navigation.navigate('Evento', {
                    nombre: item.nombre,
                    descripcion: item.descripcion,
                    fecha: item.fecha,
                    precio: item.precio,
                    organizadorId: item.organizadorId,
                    organizadorNombres: item.organizadorNombres,
                    organizadorApellidos: item.organizadorApellidos,
                    eventoId: item.key,
                    invitados: item.invitados,
                    participantes: item.participantes,
                  })
                }
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  proximos: {
    flex: 0.5,
    borderRadius: 0,
  },
  antiguos: {
    flex: 0.5,
    borderRadius: 0,
  },
});

export default TusEventos;
