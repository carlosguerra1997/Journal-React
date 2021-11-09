import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Configuración del Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7La1NmGwmg4tKbjeXo0O-02a88TnvPvE",
  authDomain: "react-journal-23750.firebaseapp.com",
  projectId: "react-journal-23750",
  storageBucket: "react-journal-23750.appspot.com",
  messagingSenderId: "62334060001",
  appId: "1:62334060001:web:745f7047fc856fd8de7ea0"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a firestore y autenticación con Google
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };