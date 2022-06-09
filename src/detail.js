import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"




const Detail = (props) => {

  
    

    const parm = useParams();
    const navigate = useNavigate(); 
    
    const myCard_list = useSelector((state) => state.loginitem.list);

    const post_idx = myCard_list.findIndex((index) => {
        return index.id === parm.id;
    });
    console.log(myCard_list[post_idx].st)



    console.log(post_idx);
    const board_detail = useSelector((state) => state.loginitem.list);
    const board_idx = board_detail.findIndex((index) => {
        return index.id === parm.id;
    });
    const bo = board_detail[board_idx];


    return (
        <>
            <Hi>{bo.title}의 상세 내용 입니다</Hi>
            <Box style={{flexDirection : myCard_list[post_idx].st }}>
                <Input>
                    <Tag> 닉네임 : {bo.nickname} </Tag>
                    <Tag> 내용 : {bo.title} </Tag>
                    <DT> 작성일자 : {bo.date}</DT>
                </Input>
                <Image src={bo.img}></Image>
            </Box>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Re onClick={() => { navigate("/") }}>뒤로가기</Re>
            </div>


        </>
    )
}

const Box = styled.div`
width: 60vw;
height: 55vh;
border: none;
background-color:#b5e0ec;
display:flex;
border-radius: 20px;
margin: 140px auto 0 auto;
overflow:scroll;
align-items: center;
`;

const Input = styled.div`
width:55vw;
height:30px;
padding: 30px;
display:flex;
justify-content:space-between;
`;

const Tag = styled.span`
margin-right: 30px;
`;

const DT = styled.div`
font-size:13px;
color:blue;
`;
const Image = styled.img`
width: 50%;
height:70%;
border-radius:40px;
`;

const Hi = styled.h1`
color:blueviolet;
font-size: 75px;
font-weight: bold;
text-align:center;
margin-bottom:-100px;
`
const Re = styled.button`
border:none;
background-color:tomato;
font-size: 20px;
color:white;
border-radius: 20px;
width:100px;
height:50px;
`;
export default Detail;