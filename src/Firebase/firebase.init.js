import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializaAuthentication = ()=>{
  initializeApp(firebaseConfig);
}

export default initializaAuthentication;