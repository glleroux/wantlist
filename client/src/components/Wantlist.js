import WantlistHeader from "./WantlistHeader"
import WantlistRow from "./WantlistRow"
import Header from "./Header"
import NavPane from "./NavPane"
import styled from "styled-components"
import _ from 'lodash'

const Wantlist = ({ userWantlist, username }) => {

    console.log(username)

    const WantlistPageContainer = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `

    const WantlistContentContainer = styled.div`
        flex: 1;
        display: flex;
        flex-direction: row;
        overflow: scroll;
    `

    const WantlistContainer = styled.div`
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 80px;
        overflow: scroll;
    `

    const releaseELOScores = userWantlist.map(release => release.ELOscore)
    console.log(releaseELOScores)

    return (
        <WantlistPageContainer>
            <Header/>
            <WantlistContentContainer>
                <NavPane username={username}/>
                <WantlistContainer>
                    <WantlistHeader/>
                    {userWantlist
                        .sort((a, b) => a.ELOscore < b.ELOscore ? 1 : -1)
                        .map(((release, index) => <WantlistRow release={release} rank={index + 1}/>))    
                    }
                </WantlistContainer>
            </WantlistContentContainer>
        </WantlistPageContainer>
        
    )
}

export default Wantlist