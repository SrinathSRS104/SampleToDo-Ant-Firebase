import firebase from "@firebase/app";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBr17SOzjPp6DpB19RT6E62MZXJWOjoIpA",
    authDomain: "fir-todo-ec975.firebaseapp.com",
    databaseURL: "https://fir-todo-ec975.firebaseio.com",
    projectId: "fir-todo-ec975",
    storageBucket: "fir-todo-ec975.appspot.com",
    messagingSenderId: "562505227215",
    appId: "1:562505227215:web:91ca9da7def7d5a1"
  };

const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore(app);

export default firestore;