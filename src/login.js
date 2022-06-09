import React from "react";
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { auth } from "./shard/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./shard/firebase";
import { signOut } from "firebase/auth";
import win from "global";

const LoginAdd = () => {

    const id_value = React.useRef(null)
    const pw_value = React.useRef(null)
    const pwo_value = React.useRef(null)
    const name_value = React.useRef(null)
    const navigate = useNavigate();
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    // window.setTimeout(()=>{

    // },5000)


    const check = () => {
        if (!reg_email.test(id_value.current.value)) {
            return false;
        } else {
            return true;
        }
    }
    const signup = async () => {
        if (pw_value.current.value == pwo_value.current.value
            && !pw_value.current.value == "" && !name_value.current.value == "") {
            const user = await createUserWithEmailAndPassword(auth,
                id_value.current.value,
                pw_value.current.value);
            // console.log(user);

            const user_doc = await addDoc(collection(db, "users"),
                {
                    user_id: user.user.email,
                    user_name: name_value.current.value
                })
            window.alert("회원가입이 완료되었습니다.");
            signOut(auth);
            navigate('/');
        } else if (!pw_value.current.value || !pwo_value.current.value) {
            window.alert("비밀번호를 입력하세요")
        } else if (pw_value.current.value != pwo_value.current.value) {
            window.alert("비밀번호가 일치하지 않습니다.")
        } else if (!name_value.current.value) {
            window.alert("닉네임을 입력하세요!")
        } else {
            window.alert("기재하지 않은곳이 있는지 확인해주세요")
        }




    }

    //    window.setTimeout(()=>{
    //         console.log(id_value);
    //         console.log(pw_value.current.value);
    //         console.log(name_value.current.value);
    //     }, 3000);


    return (
        <>
            <Box>
                아이디 : <input ref={id_value} /><br />
                비밀번호:<input type="password" ref={pw_value} /><br />
                비밀번호 확인:<input type="password" ref={pwo_value} /><br />
                닉네임 : <input ref={name_value} /><br />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <But onClick={() => { check() == true ? signup() : (window.alert("이메일 형식이 아닙니다.")) }}>회원가입</But>
                    <But onClick={() => { navigate("/") }}>돌아가기</But>
                </div>

            </Box>

        </>
    );
}



const Box = styled.div`
margin: 100px auto 0 auto;
width:500px;
height:600px;
border: none;
background-color:#cefcfd;
border-radius: 70px;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
`;

const But = styled.button`
border:none;
width:70px;
height:45px;
color:white;
background-color:#47c8ff;
border-radius:60px;
margin-right:20px;
margin-bottom:10px;
`;
export default LoginAdd;