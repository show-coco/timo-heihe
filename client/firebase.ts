import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdCm2jepvcjZuyVDYaC1WET9n2g7lpaeE",
  authDomain: "timo-heihe.firebaseapp.com",
  projectId: "timo-heihe",
  storageBucket: "timo-heihe.appspot.com",
  messagingSenderId: "386336021664",
  appId: "1:386336021664:web:f5628e5c1201b6176ffdc5",
  measurementId: "G-DKT4SH1EDW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;
