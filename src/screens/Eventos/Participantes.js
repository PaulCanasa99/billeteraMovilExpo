import React, { useEffect, useState, useContext } from 'react';
import { Button, useTheme, List, Searchbar, Divider } from 'react-native-paper';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { firebase } from '../../firebase/config';

const Participantes = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [modo, setModo] = useState('participantes');
  const { invitados, participantes } = route.params;
  const [usuariosInvitados, setUsuariosInvitados] = useState([]);
  const [usuariosParticipantes, setUsuariosParticipantes] = useState([]);
  const { colors } = useTheme();
  const usuariosRef = firebase.firestore().collection('Usuarios');
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    usuariosRef.get().then((querySnapshot) => {
      const usuarios = [];
      querySnapshot.forEach((documentSnapshot) => {
        usuarios.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      if (invitados)
        setUsuariosInvitados(
          usuarios.filter((user) => invitados.includes(user.celular))
        );
      if (participantes)
        setUsuariosParticipantes(
          usuarios.filter((user) => participantes.includes(user.celular))
        );
      setLoading(false);
    });
  }, []);
  // if (loading) {
  //   return <ActivityIndicator />;
  // }
  return (
    <>
      <View
        style={{ ...style.buttonsContainer, borderBottomColor: colors.primary }}
      >
        <Button
          theme={{ roundness: 0 }}
          labelStyle={{ fontFamily: 'Montserrat', fontSize: 20 }}
          color={modo === 'participantes' ? 'white' : colors.text}
          style={{
            ...style.proximos,
            backgroundColor:
              modo === 'participantes' ? colors.primary : colors.background,
          }}
          onPress={() => setModo('participantes')}
          uppercase={false}
        >
          Participantes
        </Button>
        <Button
          theme={{ roundness: 0 }}
          labelStyle={{ fontFamily: 'Montserrat', fontSize: 20 }}
          color={modo === 'invitados' ? 'white' : colors.text}
          style={{
            ...style.proximos,
            backgroundColor:
              modo === 'invitados' ? colors.primary : colors.background,
          }}
          onPress={() => setModo('invitados')}
          uppercase={false}
        >
          Invitados
        </Button>
      </View>
      <Searchbar
        style={style.searchBar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Divider style={{ height: 1 }} />

      <ScrollView>
        {modo === 'invitados' &&
          usuariosInvitados &&
          usuariosInvitados.map((user) => (
            <List.Item
              key={user.key}
              style={style.listItem}
              title={`${user.nombres} ${user.apellidos}`}
              left={() => <List.Icon icon="account" />}
            />
          ))}
        {modo === 'participantes' &&
          usuariosParticipantes &&
          usuariosParticipantes.map((user) => (
            <List.Item
              key={user.key}
              style={style.listItem}
              title={`${user.nombres} ${user.apellidos}`}
              left={() => <List.Icon icon="account" />}
            />
          ))}
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  listItem: {
    paddingLeft: 15,
  },
  searchBar: {
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  proximos: {
    flex: 0.5,
  },
  antiguos: {
    flex: 0.5,
  },
});

export default Participantes;
