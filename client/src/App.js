import './App.css';
import { useState } from "react";

//modules
import getUserWantlist from "./utils/getUserWantlist";

//components
import Username from './components/Username'
import HeadToHead from './components/HeadToHead';

const App = () => {

  const [userWantlist, setUserWantlist] = useState([]);
  const [username, setUsername] = useState("");

  console.log(userWantlist.map(release => release.ELOscore))

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setUserWantlist([]);
    const wantlist = await getUserWantlist(username);
    const enrichedWantlist = wantlist.map((release) => ({
      ...release,
      ELOscore: 1500,
      rank: null 
    }))
    setUserWantlist(enrichedWantlist.slice(0,10))
  };
  
  return !userWantlist.length > 0 
    ? <Username username={username} handleSubmit={handleUsernameSubmit} setUsername={setUsername}/>
    : <HeadToHead releases={userWantlist} setUserWantlist={setUserWantlist}/>
}

export default App;
