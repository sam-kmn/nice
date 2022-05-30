import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
// import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://nice-dev-41777-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});

export const auth = app.auth()
export const storage = getStorage(app)
export const database = getFirestore(app)

export default app
