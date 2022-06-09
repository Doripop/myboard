import React, { useState } from "react";
import { Route, Routes } from "react-router-dom"
import { auth } from "./shard/firebase";
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { changeCardFB, deleteCardFB, likeCard, updateCard } from "./redux/module/loginitem";
import { useNavigate } from "react-router-dom"
import { addLikeFB } from "./redux/module/likes";
import { deleteLikeFB } from "./redux/module/likes";
import { async } from "@firebase/util";




const Card = (props) => {

    
    

    const navigate = useNavigate();

    const myCard_list = useSelector((state) => state.loginitem.list);
    // console.log(myCard_list)

    const like_list = useSelector((state) => state.likes.list);
    // console.log(myCard_list[0].css)
    ////////////////////////////////




    ///////////////////////
    const user = auth.currentUser;
    // console.log(user.email);
    // console.log(myCard_list);
    const dispatch = useDispatch();
    // console.log(myCard_list);
    const [like, setLike] = useState(false);


    const heart = (postid) => {
        // console.log(postid)
        const post_idx = myCard_list.findIndex((index) => {
            return index.id === postid;
        });
        const del_post = like_list.findIndex((index) => {
            // console.log(index)
            return index.postid === postid;
        });
        // console.log(del_post)
   
        if (like) {
            setLike(false);
        } else {
            setLike(true);
        }
        dispatch(likeCard(postid, post_idx, like)); //여기에 라이크 카운트
        like == false ?
            dispatch(deleteLikeFB({ postid: like_list[del_post].id , board_id: postid}))
            : dispatch(addLikeFB({ postid: postid, user_id: user.email }))


    }


    return (

        <>
            {myCard_list.map((list, i) =>
            

                user == null ? (
                 
                    <CardBox >
                        <Real style={{flexDirection:list.st}}>
                            <div>
                                <div> Nic : {list.nickname} </div>
                                <div> 내용 : {list.title}</div>
                                <Wdate>작성일자 : {list.date}</Wdate>
                                </div>
                                <Image src={list.img} onClick={() => { navigate(`/detail/${list.id}`) }} />          {/* <span>🤍❤️</span> */}
                                <span onClick={() => { heart(`${list.id}`) }}>
                                {list.like == false ? <Heart>🤍</Heart> : <Heart>❤️</Heart>}
                                </span>
                        </Real>
                    </CardBox>
                ) :
                    user.email == list.userId ? (
                        <>
                            <CardBox>
                                <Real style={{flexDirection:list.st}}>
                                    <div>
                                        <div> Nic : {list.nickname} </div>
                                        <div> 내용 : {list.title}</div>
                                        <Wdate>작성일자 : {list.date}</Wdate>
                                        <span onClick={() => { heart(`${list.id}`) }}>
                                            {list?.like == false ? <Heart>🤍</Heart> : <Heart>❤️</Heart>}
                                        </span>
                                        <Bbox>
                                            <But onClick={() => { navigate(`/repair/${list.id}`) }} >수정하기</But>
                                            <But onClick={() => { dispatch(deleteCardFB(list.id)) }}>삭제하기</But>
                                        </Bbox>
                                    </div>
                                    <Image src={list.img}  onClick={() => { navigate(`/detail/${list.id}`) }} />     {/* <span>🤍❤️</span> */}
                                </Real>
                            </CardBox>

                        </>
                    ) :
                        <CardBox>
                            <Real style={{flexDirection:list.st}}>
                                <div>
                                    <div> Nic : {list.nickname} </div>
                                    <div> 내용 : {list.title}</div>
                                    <Wdate>작성일자 : {list.date}</Wdate>
                                    <span onClick={() => { heart(`${list.id}`) }}>
                                    {list?.like == false ? <Heart>🤍</Heart> : <Heart>❤️</Heart>}
                                    </span>
                                </div>
                                <Image src={list.img}  onClick={() => { navigate(`/detail/${list.id}`) }}/>          {/* <span>🤍❤️</span> */}
                            </Real>
                        </CardBox>






                        
            )}

            {/* onClick={() => { navigate(`/detail/${list.id}`) }} */}

        </>
    );
}

const CardBox = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin: 30px auto 30px auto;
    align-items:center;
    overflow:hidden;
    `;

const Real = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    width:75%;
    height: 35%;
    border:none;
    border-radius:30px;
    background-color: #cefcfd;
    overflow:hidden;
    `;


/* flex-direction:row; */


const Bbox = styled.div`
display:flex;
flex-direction:row;
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

const Heart = styled.span`
font-size: 30px;
font-weight:bold;
z-index:1;
`;

const Inbox = styled.div`
width:500px;
height:250px;

`;

const Image = styled.img`
width:50%;
height:150px;
`;

const Wdate = styled.span`
color:royalblue;
font-size:10px;
`;


export default Card;