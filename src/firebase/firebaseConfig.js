import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  // apiKey: "AIzaSyC7EHNEXx70w-Y95s2dZW6rR6diJDkL99M",
  // authDomain: "zalo-chats-10f1e.firebaseapp.com",
  // projectId: "zalo-chats-10f1e",
  // storageBucket: "zalo-chats-10f1e.appspot.com",
  // messagingSenderId: "1071228614114",
  // appId: "1:1071228614114:web:d237cd487ccf81952f35bb",

  apiKey: "AIzaSyA_Q1ClZOPZ36Ed0jzKbRNW0lD2rmpqWgs",
  authDomain: "zalo2-e8e16.firebaseapp.com",
  projectId: "zalo2-e8e16",
  storageBucket: "zalo2-e8e16.appspot.com",
  messagingSenderId: "409117374595",
  appId: "1:409117374595:web:a19dbec719a8d34e1143b6",
  measurementId: "G-52K7XN1KFH"

};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getStorage(FIREBASE_APP);
