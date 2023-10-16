import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCT7XrUlgT4YpWi2EcB2wDFfuaoPzolfms",
  authDomain: "disney-clone-9dc82.firebaseapp.com",
  projectId: "disney-clone-9dc82",
  storageBucket: "disney-clone-9dc82.appspot.com",
  messagingSenderId: "63120677216",
  appId: "1:63120677216:web:52f812a2e622986266a605",
};

// single pettern encoding
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
