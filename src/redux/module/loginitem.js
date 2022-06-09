import { db } from "../../shard/firebase"
import { collection, getDocs, getDoc, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { async } from "@firebase/util"
import { ref, uploadBytes } from "firebase/storage"


const CREATE = "card/CREATE"
const LOAD = "card/LOAD"
const DELETE = "card/DELETE"
const UPLOAD = "card/UPLOAD"
const UPDATE = "card/UPDATE"
////////////////////////////
const LIKE = "card/LIKE"
// 1. 액션타입과 액션에 일치하는 명을 생성한다.





const initialState = {
    list: [
        { completed: false, img: "url경로", title: "사진의 이름", userID: "DoDo" },
        { completed: false, img: "url경로", title: "사진의 이름", userID: "DoDo" }
    ]
}
// 여기는 여기서 우리가 사용할 state값을 이니셜스테이트로 값을 맨처음 설정해주는것(초기값)


// 2. 액션함수를 생성한다. 여기에 있는 액션함수는 컴포넌트에서 디스패치할떄 사용할것 + 미들웨어
//   에서 리듀서->스토어 저장할때 사용한다.
//   액션 함수에서 파라미터로 들어가는것은 컴포넌트에서 디스패치로 보낸것 
//   여기서 받은 파라미터가 밑에 있는 리듀서에 들어갑니다.
export function createCard(card) {
    return { type: CREATE, card }
}

export function loadCard(card_list) {
    return { type: LOAD, card_list };
}

export function deleteCard(card_index) {
    return { type: DELETE, card_index }
}


export function upLoadImg(img_url) {
    return { type: DELETE, img_url }
}


export function updateCard(card_index, card) {
    return { type: UPDATE, card_index, card }
}


////////////////////////////////////////////

export function likeCard(postid, post_idx, like) {
    return { type: LIKE, postid, post_idx, like }
}
///포스트아이디/ 라이크 불리언값

// 요기까지가 액션 함수


export const uploadFB = () => {
    return async function (dispacth) {

    }
}


export const loadCardFB = () => {
    return async function (dispatch) {
        const card_data = await getDocs(collection(db, "cards"));

        let card_list = [];
        card_data.forEach((doc) => {

            card_list.push({ id: doc.id, ...doc.data() });

        });


        dispatch(loadCard(card_list));
    }
}



export const addCardFB = (card) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "cards"), card);

        // console.log((await getDoc(docRef)).data());


        const _card = await getDoc(docRef);

        const newcard = { id: _card.id, ..._card.data() };

        dispatch(createCard(newcard))

    }
}




export const deleteCardFB = (card_id) => {
    return async function (dispatch, getState) {
        if (!card_id) {
            window.alert("아이디 값이 안드감")
            return;
        }

        const docRef = doc(db, "cards", card_id);

        await deleteDoc(docRef);


        const _card_list = getState().loginitem.list;

        const card_index = _card_list.findIndex((card) => {

            return card.id === card_id;
        });
        dispatch(deleteCard(card_index))
    }
}


// 변경도 해봅시다
// 1. 일단 먼저 파라미터 id값을 받아오고
export const changeCardFB = (card) => {
    return async function (dispacth, getState) {
        console.log("여기왔니", card.st, card)

        const docRef = doc(db, "cards", card.card_id);

        // 2. 아이디값이 같은 db를 찾아와줍니다.        
        await updateDoc(docRef, {
            completed: false,
            img: card.img,
            nickname: card.nickname,
            title: card.title,
            date: card.date,
            st:card.st
        });
        // 3. updateDoc를 이용하여 가져온 db의 값을 순서대로 맞게 넣어줍니다.
        // 4. 파이어베이스에는 수정 끝!
        // 5. 변경한 값을 스토어로!


        const _card_list = getState().loginitem.list;
        // 6. 삭제할때와 같이 먼저 스테이트값을 불러오고        
        const card_index = _card_list.findIndex((cards) => {
            // console.log(card);
            // console.log(card.id);
            // console.log(card.card_id);
            return cards.id === card.card_id;
        });
        // 7. findIndex값이 같은것을 불러오고 그걸이제 업데이트 액션으로 보내줍니다!

        await dispacth(updateCard(card_index, card))

    }
}




//여기가 리듀서죠!
// 리듀서에선 받아온 액션을 처리하면서 처리된것을 바탕으로 스테이트값을 리턴해주며,
// 리턴해준 스테이트값을 스토어에 저장해주는 역할을 합니다.
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case "card/CREATE": {
            const new_card_list = [...state.list, action.card];
            console.log(new_card_list);
            return { list: new_card_list };
        }

        case "card/DELETE": {
            const new_card_list = state.list.filter((item, index) => {
                return parseInt(action.card_index) !== index;
            })
            // console.log("지웠어!", new_card_list)
            return { list: new_card_list };
        }

        case "card/UPDATE": {
            const new_card_list = state.list.map((item, index) => {
                // console.log(action.card, "이게 맞아야할텐데")
                if (parseInt(action.card_index) === index) {
                    // console.log(action.card.st, "이게 맞아야할텐데")
                    return {
                        completed: false,
                        img: action.card.img,
                        nickname: action.card.nickname,
                        title: action.card.title,
                        userId: action.card.userId,
                        id: action.card.card_id,
                        date: action.card.date,
                        st:action.card.st
                    }
                } else return item;

            })
            console.log("바꿨어", new_card_list)
            return { list: new_card_list };
        }


        case "card/LIKE": {
            // console.log(action.like,,action.postid,action.post_idx "왔으면 대답좀");
            const new_card_list = state.list.map((item, index)=>{
                if(parseInt(action.post_idx)===index){
                    // console.log({...item})
                    return{...item,like :action.like}
                }else return item;
            })
            console.log(new_card_list,"들어갔겠지?");
            return{list : new_card_list}
        }








        case "card/LOAD": {
            // console.log(action.card_list);
            return { list: action.card_list };
        }
        default:
            return state;
    }

    // // 꼭 default값을 state로 반환해줍시다!!!

}



