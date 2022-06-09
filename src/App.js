import React from 'react';
import Main from './main';
import {Route, Routes} from "react-router-dom"
import LoginAdd from './login';
import ComeIn from './comeIn';
import Card from './card';
import {useDispatch} from 'react-redux'
import { loadCardFB } from './redux/module/loginitem';
import Writepage from './writepage';
import Repair from './repair';
import Detail from './detail';
import './App.css'
import { loadUserFB } from './redux/module/userinfo';



function App() {
  const dispatch = useDispatch();
  
  
  React.useEffect(()=>{  
    dispatch(loadCardFB());
    });



  return (




    <div className="App">


      <Routes>
      <Route path='/' element={<Main/>} exact/>
      <Route path='/login' element={<LoginAdd/>}/>
      <Route path='/comeIn' element={<ComeIn/>}/>
      <Route path='/writepage' element={<Writepage/>}/>
      <Route path='/repair/:id' element={<Repair/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>

      </Routes>
    </div>
  );
}

export default App;
