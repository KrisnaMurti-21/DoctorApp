// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC0sViwT3ZFrpSEV5nyI06Uys75L5hAqIA',
  authDomain: 'my-doctor-01-99ffa.firebaseapp.com',
  databaseURL:
    'https://my-doctor-01-99ffa-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'my-doctor-01-99ffa',
  storageBucket: 'my-doctor-01-99ffa.appspot.com',
  messagingSenderId: '455835426854',
  appId: '1:455835426854:web:4d2a6aa068a0f237cd06e7',
  measurementId: 'G-GT86B9PN5F',
};

// Initialize Firebase
const Fire = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(Fire, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {Fire, auth};
