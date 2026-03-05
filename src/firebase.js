import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBK5GfeJPpIkmOl58vY-D0myl8c6H_mCQs",
  authDomain: "zdruzenie-c040d.firebaseapp.com",
  projectId: "zdruzenie-c040d",
  storageBucket: "zdruzenie-c040d.firebasestorage.app",
  messagingSenderId: "862100337996",
  appId: "1:862100337996:web:2bf4ef270385606fb28be9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
//export const storage = getStorage(app);