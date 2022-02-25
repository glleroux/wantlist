import './App.css';
import { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

//modules
import getUserWantlist from "./utils/getUserWantlist";

//components
import Username from './components/Username'
import ProtectedRoute from './components/ProtectedRoute';
import HeadToHead from './components/HeadToHead';
import Wantlist from './components/Wantlist'
import NoMatch from './components/NoMatch';


const App = () => {

  const navigate = useNavigate();

  const [userWantlist, setUserWantlist] = useState(() => {
    const savedWantlist = JSON.parse(localStorage.getItem("wantlist"))
    return savedWantlist || null;
  })
  const [username, setUsername] = useState("")

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setUserWantlist([]);
    const wantlist = await getUserWantlist(username);
    const enrichedWantlist = wantlist.map((release) => ({
      ...release,
      ELOscore: 1500,
      rank: null,
      price: null
    }))
    setUserWantlist(enrichedWantlist.slice(0,5)) //needs updating
    localStorage.setItem("wantlist", JSON.stringify(enrichedWantlist.slice(0,5))); //needs updating
    navigate('/headtohead')
  };
  
  return (
    <Routes>
      <Route path="username" element={<Username setUsername={setUsername} handleSubmit={handleUsernameSubmit}/>} />
      <Route path="/" element={
        <ProtectedRoute userWantlist={userWantlist}>
          <Wantlist userWantlist={userWantlist}/>
        </ProtectedRoute>  
        } 
      />
      <Route path="wantlist" element={
        <ProtectedRoute userWantlist={userWantlist}>
          <Wantlist userWantlist={userWantlist}/>
        </ProtectedRoute>
        } 
      />
      <Route path="headtohead" element={
        <ProtectedRoute userWantlist={userWantlist}>
          <HeadToHead releases={userWantlist} setUserWantlist={setUserWantlist}/>
        </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
export default App;
