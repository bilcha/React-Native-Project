import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBn1X_zH_tSoJNjuRXSXxODpYYAY9y82M8",
  authDomain: "react-native-project-dbc34.firebaseapp.com",
  databaseURL:
    "https://react-native-project-dbc34-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-project-dbc34",
  storageBucket: "gs://react-native-project-dbc34.appspot.com",
  // messagingSenderId: "523611749906",
  // appId: "1:523611749906:ios:39c245696d6f990fcaa2cb",
  // measurementId: "G-Z5W3H7KFLE",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
