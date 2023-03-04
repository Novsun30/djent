import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCYxeIZB_gmpGtYT5KMeP7SoZu6q3dz4k",
  authDomain: "djent-28b47.firebaseapp.com",
  projectId: "djent-28b47",
  storageBucket: "djent-28b47.appspot.com",
  messagingSenderId: "507378951688",
  appId: "1:507378951688:web:32d8306b01679498e953bd",
  measurementId: "G-9FXESLWEEM",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
