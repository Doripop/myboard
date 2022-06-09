import { collection, getDocs, getDoc, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import { auth, db } from "../../shard/firebase"
import { async } from "@firebase/util"
import { signInWithEmailAndPassword } from "firebase/auth";



const ADD = "like/ADD";
const DELETE = "like/DELETE";


const initialState = {
    list: [
        { postid: "" , user_id: "www@www.com" },
       
    ]
}


export function likeAdd(post) {
    return { type: ADD, post }
}

export function likeDELETE(post) {
    return { type: DELETE, post }
}



//middleWare
//post => postid: "게시물 id" , user_id: "www@www.com"
export const addLikeFB = (post) => {
    // console.log(post);
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "likes"), post);

        const _likes = await getDoc(docRef);
       

        const newlike = { id: _likes.id, ..._likes.data() };
        console.log(newlike)
        dispatch(likeAdd(newlike))

    }
}


export const deleteLikeFB = (post) => {
    console.log(post.postid)
    return async function (dispatch, getState) {
        if (!post.postid) {
            window.alert("아이디 값이 안드감")
            return;
        }

        const docRef = doc(db, "likes", post.postid);

        await deleteDoc(docRef);


        const _like_list = getState().loginitem.list;

        const like_index = _like_list.findIndex((like) => {
            console.log(like.id, post.board_id)
            return like.id === post.board_id;
        });
        dispatch(likeDELETE(like_index))
    }
}



export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case "like/ADD": {
            const new_like_list = [...state.list, action.post];
            // console.log(new_like_list);
            return { list: new_like_list };
        }

        case "like/DELETE": {
            const new_like_list = state.list.filter((item, index) => {
                // console.log(action.post)
                return parseInt(action.post) !== index;
            })
            console.log("지웠어!", new_like_list)
            return { list: new_like_list };
        }


        default:
            return state;
    }
}