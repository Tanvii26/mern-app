import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "netflix-clone-98f60.firebaseapp.com",
    projectId: "netflix-clone-98f60",
    storageBucket: "netflix-clone-98f60.appspot.com",
    messagingSenderId: "721412194284",
    appId: "1:721412194284:web:79836e525a3a501f5fcac9",
    measurementId: "G-K338VP0JD9"
  };

const app = initializeApp(firebaseConfig)

const storage = getStorage(app);
export default storage;