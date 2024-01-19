
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyC2owfi3UZEHN8RpuZvCPj9cgU3ufADhbo",
  authDomain: "suppliero.firebaseapp.com",
  projectId: "suppliero",
  storageBucket: "suppliero.appspot.com",
  messagingSenderId: "1038771819747",
  appId: "1:1038771819747:web:cbe82b4cc91c56a639a1d6"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase } ;
