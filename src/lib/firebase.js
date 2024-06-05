// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey:"AIzaSyAdMMcT6HOGawo4INi-IJCMeI8w-hNOjbs",
  authDomain: "react-chat-5beeb.firebaseapp.com",
  projectId: "react-chat-5beeb",
  storageBucket: "react-chat-5beeb.appspot.com",
  messagingSenderId: "464598362201",
  appId: "1:464598362201:web:5076af9f903d1516a46948"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const  storage  = getStorage()