import React from "react";

import Card from "./card";


import { useNavigate } from "react-router-dom"



import { auth } from "./shard/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { signOut } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/module/userinfo";

import styled from "styled-components"

const Main = () => {


    const dispatch = useDispatch();

    const navigate = useNavigate();
    // console.log(auth.currentUser);

    //로그인 상태값 초기화
    const [is_login, setIsLogin] = React.useState(false);

    const loginCheck = async (user) => {
        if (user) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }

    const logoutCheck = () => {
        dispatch(logout())
    }




    //로그인체크
    React.useEffect(() => {
        onAuthStateChanged(auth, loginCheck);
    }, []);

    const user_list = useSelector((state) => state.userinfo.list);
    console.log(user_list[0]?.user_id);

    return (

        <>
            <Inner>
                {/* {user_list[0]?.user_id}님 환영합니다. */}
                {/* {sessionStorage.getItem("user_name")}님 환영합니다. */}
                <br />
                {is_login ? (
                    <>
                        <Title>BOARD</Title>
                        {sessionStorage.getItem("user_name")}님 환영합니다.
                        <Under>
                            <But onClick={() => { signOut(auth); logoutCheck(); sessionStorage.clear(); }}>
                                로그아웃
                            </But>
                            <But onClick={() => (navigate('/writepage'))}> 글쓰기 </But>
                        </Under>

                    </>
                ) :
                    <>
                        <Title>BOARD</Title>
                        <Under>
                            <But onClick={() => (navigate('/comeIn'))}>로그인</But>
                            <But onClick={() => (navigate('/login'))}>회원가입</But>
                        </Under>

                    </>
                }
            </Inner>
         


            <Card />


        </>
    );
}

const Inner = styled.div`
height:150px;
display:flex;
justify-content:flex-end;
align-items:center;
flex-direction:column;
font-size:35px;
font-weight:bold;
`;

const But = styled.button`
border:none;
width:150px;
height:45px;
color:white;
background-color:tomato;
border-radius:60px;
margin-right:20px;
`;

const Title = styled.span`
font-size:35px;
font-weight: bold;
color: royalblue;
text-align: center;
`;

const Under = styled.div`
display:flex;
flex-direction:row;
justify-content:center
`;

export default Main;