import { auth, db } from "../../shard/firebase"
import { collection, getDocs, getDoc, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { async } from "@firebase/util"
import { signInWithEmailAndPassword } from "firebase/auth";


const LOADIN = "user/LOADIN"
const LOGOUT = "user/LOGOUT"

const initialState = {
    list: [
        { user_id: "" },
    ]
}

export function loadIn(userin) {
    console.log(userin);
    return { type: LOADIN, userin }
}


export function logout(userout) {
    return { type: LOGOUT, userout }
}


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {


        case "user/LOADIN": {
            const new_user_list = [{ user_id: action.userin }];
            console.log(new_user_list);
            console.log('아이디 저장했써');
            return { list: new_user_list };
        }

        case "user/LOGOUT": {
            const new_user_list = [{ user_id: "" }]
            return { list: new_user_list }
        }




        default:
            return state;
    }
}