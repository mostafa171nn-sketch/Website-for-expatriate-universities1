import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDre3p-ip8gvO23qwrvtGVyhjW8OfPu9So",
  authDomain: "zozo-40770.firebaseapp.com",
  projectId: "zozo-40770",
  storageBucket: "zozo-40770.firebasestorage.app",
  messagingSenderId: "876756446043",
  appId: "1:876756446043:web:e1a45c4bd2a9264e0cc87e",
  measurementId: "G-SKJVEP17H3"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else if (typeof window !== "undefined") {
  app = getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, auth, db, storage };

