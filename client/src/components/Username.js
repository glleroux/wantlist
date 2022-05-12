
import styled from "styled-components"
import { Oval } from 'react-loading-icons'


import Header from "./Header"
import TextInput from "./TextInput"
import Submit from "./Submit"

const UsernamePageContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column
`

const UsernameContentContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Username = ({ username, handleSubmit, setUsername, loading }) => {
    
    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <UsernamePageContainer>
            <Header/>
            <UsernameContentContainer>
                <TextInput value={username} onChange={handleChange} placeholder="Enter Discogs username"></TextInput>
                {!loading 
                    ? <Submit text={<p style={{'padding': '4px 0px', 'margin': '0'}}>Sync</p>} handleSubmit={handleSubmit}></Submit>
                    : <Submit text={<Oval stroke="#ffffff" height='1.5em' strokeWidth='4'/>} handleSubmit={handleSubmit}></Submit>
                }
            </UsernameContentContainer>
        </UsernamePageContainer>
    )
}

export default Username