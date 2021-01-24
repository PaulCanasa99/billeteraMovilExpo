import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Searchbar, Divider, List } from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import { firebase } from '../../firebase/config';

const EnviarDinero = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState(null);
  const [numerosRegistrados, setNumerosRegistrados] = useState([]);
  const usuariosRef = firebase.firestore().collection('Usuarios');

  const onChangeSearch = (query) => setSearchQuery(query);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName,
        });
        if (data.length > 0) {
          usuariosRef.get().then((querySnapshot) => {
            const numeros = [];
            querySnapshot.forEach((doc) => {
              numeros.push(doc.data().celular);
            });
            setNumerosRegistrados(numeros);
            const phoneNumbers = data.filter((contact) => {
              if (contact.phoneNumbers && contact.name)
                if (contact.phoneNumbers[0].digits[0] == 9)
                  return numerosRegistrados.includes(
                    '+51' + contact.phoneNumbers[0].digits
                  );
                else
                  return numerosRegistrados.includes(
                    contact.phoneNumbers[0].digits
                  );
              else return false;
            });
            setContacts(phoneNumbers);
            setLoading(false);
          });
        }
      }
    })();
  }, [loading]);
  const handlePress = (phoneNumber) => {
    let number = phoneNumber;
    if (phoneNumber[0] == 9) {
      number = '+51' + phoneNumber;
    }
    usuariosRef
      .where('celular', '==', number)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          navigation.navigate('RealizarEnvio', {
            name: 'Realizar envío',
            phoneNumber: number,
          });
        });
      })
      .catch(() => {
        console.log('rip');
      });
  };
  if (loading) return <ActivityIndicator />;
  return (
    <>
      <Searchbar
        style={style.searchBar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Divider style={style.divider} />
      <ScrollView>
        {contacts &&
          contacts.map((contact) => {
            if (contact.phoneNumbers && contact.name)
              return (
                <List.Item
                  key={contact.id}
                  onPress={() => handlePress(contact.phoneNumbers[0].digits)}
                  style={style.listItem}
                  title={contact.name}
                  description={contact.phoneNumbers[0].number}
                  left={() => <List.Icon icon="account" />}
                />
              );
          })}
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  divider: {
    height: 1,
  },
  listItem: {
    paddingLeft: 15,
  },
});

export default EnviarDinero;
