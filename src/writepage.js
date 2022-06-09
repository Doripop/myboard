import React, { useEffect } from "react";
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { auth, storage } from "./shard/firebase";
import { addCardFB } from "./redux/module/loginitem";
import { useNavigate } from "react-router-dom"
import { async } from "@firebase/util";
import { uploadFB } from "./redux/module/loginitem";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useState } from "react";


const Writepage = (props) => {


  const user_list = useSelector((state) => state.userinfo.list);
  console.log(user_list[0].user_id);

  const navigate = useNavigate();

  const title = React.useRef(null);
  const img = React.useRef(null);

  const dispatch = useDispatch();
  const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
  // console.log(date);
  const file_link_ref = React.useRef(null)

  const fileUp = async () => {
    const uploadfile = await uploadBytes(
      ref(storage, `images/${img.current.files[0].name}`),
      img.current.files[0]);
    const file_url = await getDownloadURL(uploadfile.ref);
    file_link_ref.current = { url: file_url }
  }

  // useEffect(()=>{

  // },[file_link_ref.current.url])
  
  const addCard  =() => {
    // console.log(auth.currentUser);
    // console.log(title.current.value,img.current.value);
    window.setTimeout(() => {
      dispatch(addCardFB({
        title: title.current.value,
        img: file_link_ref.current.url,
        like_count: 0,
        userId: auth.currentUser.email,
        nickname: user_list[0].user_id,
        date: date,
        like: false,
        st: check
      }
      ))
      navigate("/");
    }, 1800);
  }

  const [imageSrc, setImageSrc] = useState('');


  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };



  // const upload = async (e) => {
  //     console.log(e);
  //     const uploadfile = await uploadBytes(
  //         ref(storage, `images/${e.target.files[0].name}`),
  //         e.target.files[0]);
  //         const file_url = await getDownloadURL(uploadfile.ref);
  //         file_link_ref.current = {url :file_url};
  // }


  // const check = React.useRef(null);
  const [check, setCheck] = useState("row-reverse")
  const ck = async(e) => {
    
   setCheck(e.target.value)
    
  };
  console.log(check);
  return (

    <WriteBox>
      내용: <Bar type={"text"} ref={title} placeholder="내용을 입력해주세요"></Bar>
      사진: <Bar type={"file"} ref={img} onChange={(e) => {
        encodeFileToBase64(e.target.files[0]);
      }}
      ></Bar>
      <div style={{height:"180px", width:"200px", backgroundColor:"gray", marginBottom:"20px"}}>
        {imageSrc && <Image src={imageSrc} alt="preview-img" />}
      </div>
      <div style={{display:'flex', flexDirection:'row'}}>
        <But onClick={() => { fileUp(); addCard(); }}>작성하기</But>
        <But onClick={() => { navigate("/") }}>취소</But>
      </div>
      

      <div style={{ display: "flex", margin: "auto", flexDirection: "column" }}>
        <span style={{fontSize:"20px"}}>원하시는 레이아웃을 골라주세요!!</span>
        <div>
          <label>왼쪽(사진)+오른쪽(내용)</label>
          <input class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="row-reverse"
            onChange={ck}
          />
        </div>
        <div>
          <label>오른쪽(사진)+왼쪽(내용)</label>
          <input class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="row"
            onChange={ck}
          />
        </div>
        <div>
          <label>아래(사진)+위쪽(내용)</label>
          <input class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="column"
            onChange={ck}
          />
        </div>


      </div>


    </WriteBox>
  )
}



const WriteBox = styled.div`
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

const Bar = styled.input`
border:none;
background-color:transparent;
outline:none;
border-bottom: 2px solid rgb(219, 232, 216);
width:200px;
font-size:20px;
margin-bottom:30px;
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

const Image = styled.img`
width:200px;
height:180px;
`;

export default Writepage;