import React from "react";
import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { changeCardFB } from "./redux/module/loginitem";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { auth, storage } from "./shard/firebase";
import { useParams } from "react-router-dom"

const Repair = (props) => {

  const parm = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_list = useSelector((state) => state.userinfo.list);
  const board_list = useSelector((state) => state.loginitem.list);
  // console.log(user_list);
  // console.log(board_list);
  // console.log(parm.id);

  const board_idx = board_list.findIndex((index) => {
    return index.id === parm.id;
  });
  console.log(board_list[board_idx].like);

  const new_img = board_list[board_idx].img;


  const file_link_ref = React.useRef(null)
  const title = React.useRef(null);
  const img = React.useRef(null);

  const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
  console.log(date);


  console.log(parm.id);
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

  //   window.setTimeout(()=>{
  //             console.log(title.current.value);
  //             // console.log(pw_value.current.value);
  //             // console.log(name_value.current.value);
  //         }, 3000);


  const fileUp = async () => {
    try {
      const uploadfile = await uploadBytes(
        ref(storage, `images/${img.current.files[0].name}`),
        img.current.files[0]);
      const file_url = await getDownloadURL(uploadfile.ref);
      file_link_ref.current = { url: file_url }
    } catch {
      return file_link_ref.current = null;
    }


  }

  const changeCardList = () => {
    window.setTimeout(() => {
      dispatch(changeCardFB({
        title: title.current.value,
        img: file_link_ref.current == null ? new_img : file_link_ref.current.url,
        completed: false,
        userId: auth.currentUser.email,
        nickname: user_list[0].user_id,
        card_id: parm.id,
        date: date,
        like: board_list[board_idx].like,
        st: check
      }))

      console.log("?????????")
      navigate("/");

    }, 1900);
  }


  const [check, setCheck] = useState("row-reverse")
  const ck = async (e) => {

    setCheck(e.target.value)

  };

  return (
    <>

      <WriteBox>
        ??????: <Bar type={"text"} ref={title} placeholder="????????? ??????????????????"></Bar>
        ??????: <Bar type={"file"} ref={img} onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
        ></Bar>
         <div style={{height:"180px", width:"200px", backgroundColor:"gray", marginBottom:"20px"}}>
          {imageSrc && <Image src={imageSrc} alt="preview-img" />}
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
          <But onClick={() => { fileUp(); changeCardList() }}>????????????</But>
        <But onClick={() => { navigate("/") }}>??????</But>
        </div>
        

        <div style={{ display: "flex", margin: "auto", flexDirection: "column" }}>
        <span style={{fontSize:"20px", color:"purple"}}>???????????? ??????????????? ???????????????!!</span>
          <div>
            <label>??????</label>
            <input class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="row-reverse"
              onChange={ck}
            />
          </div>
          <div>
            <label>?????????</label>
            <input class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="row"
              onChange={ck}
            />
          </div>
          <div>
            <label>??????</label>
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

    </>
  );
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

const Image = styled.img`
width:200px;
height:180px;
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

export default Repair;