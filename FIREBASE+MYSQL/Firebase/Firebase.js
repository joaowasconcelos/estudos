// Importando funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage"
import writeUserData from './start.js';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBIvrK4XIoKggrTkcQdThlpYmIakVHmbKY",
  authDomain: "teste-firebase-b05a9.firebaseapp.com",
  projectId: "teste-firebase-b05a9",
  storageBucket: "teste-firebase-b05a9.appspot.com",
  messagingSenderId: "1042867126453",
  appId: "1:1042867126453:web:015e2c603dc64b7bb5fefc",
  measurementId: "G-4W276EWGCH"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage();

// Usando a função writeUserData para escrever dados no Firebase Database
writeUserData("3", "joao", "joao@example.com",database);
