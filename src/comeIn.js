import React from "react";
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { auth, db } from "./shard/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, where, query, collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loadIn, loadUserFB } from "./redux/module/userinfo";

const ComeIn = () => {

    const id_value = React.useRef(null)
    const pw_value = React.useRef(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //리덕스로 날릴놈
    const loginInFB = async () => {

        const user = await signInWithEmailAndPassword(
            auth,
            id_value.current.value,
            pw_value.current.value
        ).catch(function (error) {
            // eslint-disable-next-line default-case
            switch (error.code) {
                case "auth/user-not-found":
                    alert("등록되어있지 않은 회원이에요 😢");
                    break;
                case "auth/invalid-email":
                    alert("E-mail 형식으로 입력해주세요!");
                    break;
                case "auth/wrong-password":
                    alert("비밀번호를 확인해주세요 !");
                    break;
            }
        })
        console.log(user);

        const user_docs = await getDocs(
            query(
                collection(db, "users"),
                where("user_id", "==", user.user.email)
            ));
        user_docs.forEach(u => {
            // console.log(u.data());
            sessionStorage.setItem("user_name", u.data().user_name)
            window.alert(u.data().user_name + "님 환영합니다.");
            dispatch(loadIn(u.data().user_name));
        });
        // 유저 데이터 불러오기

        navigate('/');
    }




    return (
        <>
            <Box>
                아이디(이메일): <input ref={id_value} /><br />
                비밀번호:<input type="password" ref={pw_value} /><br />
                <button onClick={() => { loginInFB() }}>로그인</button>
                <button onClick={() => { navigate("/") }}>돌아가기</button>
            </Box>
        </>
    )
}


const Box = styled.div`
width:364px;
max-width: 364px;
height: 70vh;
border: 1px solid royalblue;
display: columns;
justify-content: center;
align-items:center;
margin:auto;

`;


export default ComeIn;