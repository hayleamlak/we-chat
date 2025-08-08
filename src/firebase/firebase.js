// src/firebase/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2ziYWta1cga-LsBgnf6Jn23oCxHeRVCA",
  authDomain: "we-chat-51db5.firebaseapp.com",
  projectId: "we-chat-51db5",
  storageBucket: "we-chat-51db5.appspot.com",
  messagingSenderId: "397476863406",
  appId: "1:397476863406:web:72bf4a07d911204aa57c3f",
  measurementId: "G-BGEXGXWH2D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
