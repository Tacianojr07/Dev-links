import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD809YSlo_1KO5-DbEKnLmqhRE5TIQr4ss",
  authDomain: "react-77a06.firebaseapp.com",
  projectId: "react-77a06",
  storageBucket: "react-77a06.appspot.com",
  messagingSenderId: "1091215573646",
  appId: "1:1091215573646:web:573105aee58b34b588ffdf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
