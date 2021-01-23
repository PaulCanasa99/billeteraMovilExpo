import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { firebase } from './src/firebase/config';
import Navigator from './src/screens/Navigator';
import merge from 'deepmerge';
import { Context } from './src/context/Context';
import RegistroNavigator from './src/screens/Registro/RegistroNavigator';
import { useFonts } from 'expo-font';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [usuario, setUsuario] = useState();
  const [destination, setDestination] = useState('');
  const usuariosRef = firebase.firestore().collection('Usuarios');
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });
  const theme = {
    ...PaperDefaultTheme,
    roundness: 50,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: '#00ADB5',
      accent: '#EEEEEE',
      background: '#A6E3E9',
      text: '#222831',
      surface: '#222831',
    },
  };

  const MyTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      primary: '#00ADB5',
      background: '#A6E3E9',
      text: '#222831',
      card: '#222831',
    },
  };
  const CombinedDefaultTheme = merge(theme, MyTheme);
  //const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user)
      usuariosRef
        .where('celular', '==', user.phoneNumber)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            setUsuario({
              ...documentSnapshot.data(),
              userId: documentSnapshot.id,
            });
          });
        });
    else setUsuario(null);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing || !loaded) return null;

  return (
    <Context.Provider
      value={{ usuario, setUsuario, destination, setDestination }}
    >
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          {usuario ? <Navigator /> : <RegistroNavigator />}
        </NavigationContainer>
      </PaperProvider>
    </Context.Provider>
  );
};
export default App;
