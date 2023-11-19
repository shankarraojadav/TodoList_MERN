import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,

//   authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,

//   projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,

//   storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,

//   messagingSenderId: import.meta.env
//     .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

//   appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,

//   measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDORapyP8v6U-ZIfRTsfiyUcSUHiOJdCJg",
  authDomain: "todolist-d5270.firebaseapp.com",
  projectId: "todolist-d5270",
  storageBucket: "todolist-d5270.appspot.com",
  messagingSenderId: "1027931809270",
  appId: "1:1027931809270:web:7ed0f117593cd2319653d7",
  measurementId: "G-1765Z9VR6B",
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
