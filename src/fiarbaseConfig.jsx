// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO5LuJxS30ER5klRcg4mfNcdiRqvSkjtg",
  authDomain: "bachalchat.firebaseapp.com",
  projectId: "bachalchat",
  storageBucket: "bachalchat.appspot.com",
  messagingSenderId: "885590595362",
  appId: "1:885590595362:web:33b068a5c55ba14c64f77b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig