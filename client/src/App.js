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
import PurchasePlan from './components/PurchasePlan';
import NoMatch from './components/NoMatch';
import WantlistMantine from './components/Mantine/WantlistMantine';
import PurchasePlanMantine from './components/Mantine/PurchasePlanMantine';


const App = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userWantlist, setUserWantlist] = useState(() => {
    const savedWantlist = JSON.parse(localStorage.getItem("wantlist"))
    return savedWantlist || null;
  })
  const [username, setUsername] = useState("")

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setUserWantlist([]);
    setUsername(username)
    setLoading(true)
    const wantlist = await getUserWantlist(username);
    const enrichedWantlist = wantlist.map((release) => ({
      ...release,
      ELOscore: 1500,
      rank: null,
      price: null
    }))
    setUserWantlist(enrichedWantlist.slice(80,100)) //needs updating
    localStorage.setItem("wantlist", JSON.stringify(enrichedWantlist.slice(80,100))); //needs updating
    navigate('/headtohead')
  };

  console.log(username)
  
  return (
    <Routes>
      <Route path="username" element={<Username setUsername={setUsername} handleSubmit={handleUsernameSubmit} loading={loading}/>} />
      <Route path="/" element={
        <ProtectedRoute userWantlist={userWantlist}>
          <WantlistMantine userWantlist={userWantlist} setUserWantlist={setUserWantlist}/>
        </ProtectedRoute>  
        } 
      />
      <Route path="wantlist" element={
        <ProtectedRoute userWantlist={userWantlist}>
          <WantlistMantine userWantlist={userWantlist} setUserWantlist={setUserWantlist}/>
        </ProtectedRoute>
        } 
      />
      <Route path="headtohead" element={
        <ProtectedRoute userWantlist={userWantlist}>
          <HeadToHead releases={userWantlist} setUserWantlist={setUserWantlist}/>
        </ProtectedRoute>
        } 
      />
      <Route path="purchaseplan" element={
        <ProtectedRoute userWantlist={userWantlist}>
          <PurchasePlanMantine releases={userWantlist}/>
        </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
export default App;
