import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBlq403OuLq8CjeF0FJkuMiqQuB1ytJukQ",
  authDomain: "post-hive-images.firebaseapp.com",
  projectId: "post-hive-images",
  storageBucket: "post-hive-images.appspot.com",
  messagingSenderId: "101119796391",
  appId: "1:101119796391:web:5dba1ea5b496894db8a782",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
