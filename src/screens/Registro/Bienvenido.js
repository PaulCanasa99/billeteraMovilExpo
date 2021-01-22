import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme, Text, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from 'expo-firebase-recaptcha';
// import * as firebase from '../../firebase/config';
import { firebase } from '../../firebase/config';
import Verificacion from './Verificacion';

let backgroundColor;
const Bienvenido = ({ navigation }) => {
  const [verificationId, setVerificationId] = useState();
  const { colors } = useTheme();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  backgroundColor = colors.accent;
  const [phoneNumber, setPhoneNumber] = useState();
  const recaptchaVerifier = React.useRef(null);
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === 'web'
      ? {
          text:
            'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
        }
      : undefined
  );
  const attemptInvisibleVerification = false;

  // Handle the button press
  const convertirNumero = (num) => {
    const primero = Math.trunc(num / 1000000);
    const segundo = Math.trunc((num / 1000) % 1000);
    const tercero = Math.trunc(num % 1000);
    console.log(`+51 ${primero} ${segundo} ${tercero}`);
    return `+51 ${primero} ${segundo} ${tercero}`;
  };

  const signInWithPhoneNumber = async () => {
    // The FirebaseRecaptchaVerifierModal ref implements the
    // FirebaseAuthApplicationVerifier interface and can be
    // passed directly to `verifyPhoneNumber`.
    try {
      console.log('efe');
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        '+51992878219',
        recaptchaVerifier.current
      );
      console.log('eeee');
      setVerificationId(verificationId);
      showMessage({
        text: 'Verification code has been sent to your phone.',
      });
    } catch (err) {
      console.log('fallo0');
      showMessage({ text: `Error: ${err.message}`, color: 'red' });
    }
  };
  const confirmCode = async (verificationCode) => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await firebase.auth().signInWithCredential(credential);
      showMessage({ text: 'Phone authentication successful 👍' });
      navigation.navigate('Registro', {
        name: 'Registro',
        phoneNumber: `+51${phoneNumber}`,
      });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: 'red' });
    }
  };

  if (!verificationId) {
    return (
      <KeyboardAwareScrollView
        style={{ paddingTop: 60 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={style.container}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={attemptInvisibleVerification}
          />
          <MaterialCommunityIcons
            name="account-circle"
            size={150}
            color="black"
          />

          <Text style={style.titulo}>Bienvenido a NombreDeLaApp</Text>
          <Text style={style.texto}>Ingrese su número:</Text>
          <View style={style.inputContainer} backgroundColor={colors.accent}>
            <Text style={style.prefix}>+51</Text>
            <TextInput
              placeholder="Ingrese su número de celular"
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              onChangeText={(number) => setPhoneNumber(number)}
            />
          </View>
          <Button
            style={style.button}
            uppercase={false}
            mode="contained"
            onPress={() => signInWithPhoneNumber(convertirNumero(phoneNumber))}
          >
            Siguiente
          </Button>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return <Verificacion confirmCode={confirmCode} />;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 36,
    textAlign: 'center',
  },
  texto: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    borderRadius: 25,
    backgroundColor: '#EEEEEE',
    marginTop: 20,
    height: 40,
  },
  prefix: {
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  button: {
    width: '70%',
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 50,
  },
});
export default Bienvenido;
