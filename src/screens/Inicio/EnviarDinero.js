import React, { useState, useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Searchbar, Divider, List } from 'react-native-paper';

const EnviarDinero = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState(null);
  const onChangeSearch = (query) => setSearchQuery(query);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    })();
  }, []);
  const handlePress = (phoneNumber) => {
    navigation.navigate('RealizarEnvio', {
      name: 'Realizar envío',
      phoneNumber: phoneNumber,
    });
  };
  return (
    <>
      <Searchbar
        style={style.searchBar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Divider style={style.divider} />
      {/* <ScrollView>
        {contacts &&
          contacts.map((contact) => {
            return (
              <List.Item
                key={contact.phoneNumbers[0].number}
                onPress={() => handlePress(contact.phoneNumbers[0].number)}
                style={style.listItem}
                title={`${contact.givenName} ${contact.familyName}`}
                description={contact.phoneNumbers[0].number}
                left={() => <List.Icon icon="account" />}
              />
            );
          })}
      </ScrollView> */}
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
