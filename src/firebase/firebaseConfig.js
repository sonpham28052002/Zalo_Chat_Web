import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC7EHNEXx70w-Y95s2dZW6rR6diJDkL99M",
  authDomain: "zalo-chats-10f1e.firebaseapp.com",
  projectId: "zalo-chats-10f1e",
  storageBucket: "zalo-chats-10f1e.appspot.com",
  messagingSenderId: "1071228614114",
  appId: "1:1071228614114:web:d237cd487ccf81952f35bb",
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getStorage(FIREBASE_APP);
