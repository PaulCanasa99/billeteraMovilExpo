import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBcis3xR4JsftjLwnbjPqL-kRWLoCuy_QI',
  authDomain: 'inductive-gift-291119.firebaseapp.com',
  projectId: 'inductive-gift-291119',
  storageBucket: 'inductive-gift-291119.appspot.com',
  messagingSenderId: '152979494813',
  appId: '1:152979494813:web:1c73c0a129b86777808174',
  measurementId: 'G-SQSEY2T779',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
