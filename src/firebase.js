import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVZ6GKCReFgIQab9MHfKsPN974Pv5ERQk",
  authDomain: "todo-eb36c.firebaseapp.com",
  projectId: "todo-eb36c",
  storageBucket: "todo-eb36c.appspot.com",
  messagingSenderId: "660934701167",
  appId: "1:660934701167:web:de89d4aa849f08aba1dd9a",
  measurementId: "G-D65VNTDM9P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
