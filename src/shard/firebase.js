import { initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRHigB5u6fBJ38X7usE6iVqokelbIW5ZY",
    authDomain: "authex-27603.firebaseapp.com",
    projectId: "authex-27603",
    storageBucket: "authex-27603.appspot.com",
    messagingSenderId: "847406229692",
    appId: "1:847406229692:web:6142b8b7b4cb1da66688b9",
    measurementId: "G-ND03PQ7MEE"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export default app;