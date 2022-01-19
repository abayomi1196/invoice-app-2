import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq2nR6Th3gBYiMVRQbO-M9ngOM7wZ8RiA",
  authDomain: "invoice-app-a8fa2.firebaseapp.com",
  projectId: "invoice-app-a8fa2",
  storageBucket: "invoice-app-a8fa2.appspot.com",
  messagingSenderId: "1002373262356",
  appId: "1:1002373262356:web:11a037a7b11f53b2570b01",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// instantiate firestore
const store = getFirestore(firebaseApp);

export default store;
