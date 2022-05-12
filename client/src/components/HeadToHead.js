import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'
import Elo from "@pelevesque/elo";

import Header from "./Header";
import styled from "styled-components";
import LineIcon from "react-lineicons";


const H2HPageContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`
const H2HContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
`

const H2HReleasesContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: calc((100vw - 160px) * 2);
    justify-content: space-around;
`

const H2HReleaseInfoCard = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    padding: 15px 20px;
    background-color: #393945;
    margin-top: 8px;
`
//need to modularise fonts
const H2HReleaseTitle = styled.h2` 
    color: #FFFFFF;
    font-size: 26px;
    margin: 0;
    line-height: 135%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
`
const H2HReleaseArtist = styled.p`
    font-size: 18px;
    line-height: 155%;
    color: #FFFFFF;
    margin: 0;
    margin-top: 8px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
`
const H2HReleaseCat = styled.p`
    font-size: 12px;
    line-height: 155%;
    color: #8F94AB;
    margin: 0;
    margin-top: 8px;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`

const H2HReleaseArt = styled.div`
    background-image: url(${props => props.coverImage});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 400px;
    height: 400px;
`

const H2HRelease = styled.div`
    display: flex;
    flex-direction: column;
`

const Overlay = styled.div`
    width: 160px;
    height: calc(100vh - 80px);
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgb(39, 39, 48, 0.6)
`

const HeadToHead = ({ releases, setUserWantlist }) => {

    const [previousContests, setPreviousContests] = useState(() => {
        const savedPreviousContests = JSON.parse(localStorage.getItem("previous_contests"))
        return savedPreviousContests || {};
      })
    const [contestants, setContestants] = useState([releases[0], releases[1]])
    const [nextContestants, setNextContestants] = useState([releases[2], releases[3]])
    const navigate = useNavigate()
    
    const updateReleaseScores = (winner, loser, newReleaseScores) => {
        console.log(newReleaseScores)
        setUserWantlist(
            releases.map(release => 
                release.id === winner.id 
                ? {...release, ELOscore : newReleaseScores.winner} 
                : release.id === loser.id 
                ? {...release, ELOscore : newReleaseScores.loser} 
                : release 
        ))
        localStorage.setItem("wantlist", JSON.stringify(releases))
    }

    const getNewReleaseScores = (winningRelease, losingRelease) => {
        const elo = new Elo();
        const outcomeObject = elo.getOutcome(
            winningRelease.ELOscore,
            losingRelease.ELOscore,
            1
        );
        return {
            winner: Math.round(outcomeObject.a.rating),
            loser: Math.round(outcomeObject.b.rating)
        }
         
    }

    const saveContest = (contestantA, contestantB) => {
        const initialState = {...previousContests}
        
        if (!initialState[contestantA.id]) { //if contestantA doesn't exist in list of previous contests                  
            initialState[contestantA.id] = [contestantB.id] //create contestantA and add contest against contestantB
        } else {
            if (!initialState[contestantA.id].includes(contestantB.id)) { //if contestantA does exist but hasn't contestedB before 
                initialState[contestantA.id].push(contestantB.id) //add B
            }                                                        
        }

        if (!initialState[contestantB.id ]) {
            initialState[contestantB.id] = [contestantA.id]
        } else {
            if (!initialState[contestantB.id].includes(contestantA.id)) {
                initialState[contestantB.id].push(contestantA.id) 
            } 
        }
        setPreviousContests(initialState)
        localStorage.setItem("previous_contests", JSON.stringify(initialState))
    }  
    
    const getNewContest = () => {

        const shuffledReleases = _.shuffle(releases)
        let contestantA
        let contestantB
        let newContest
        
        startMatch:
        for (const releaseA of shuffledReleases) { //iterate through every release
            console.log('releaseA: ',releaseA.id)
            for (const releaseB of shuffledReleases) { //iterate through every release again
                if (releaseA.id === releaseB.id) { // if release B is the same as release A
                    continue //jump to next release B
                } else if (!previousContests[releaseA.id] // else if release A doesn't exist in previous contests
                    || !previousContests[releaseA.id].includes(releaseB.id)) { //or release B hasn't been matched against release A
                        console.log('releaseB: ',releaseB.id)
                        contestantA = releaseA 
                        contestantB = releaseB
                        newContest = [contestantA, contestantB]
                        break startMatch //end both loops, contest has been found
                }
            }
        }
        
        newContest ? console.log('new contest found') : console.log('new contest not found')
        return newContest
    }

    const handleSelection = (winner, loser) => {
        const newReleaseScores = getNewReleaseScores(winner, loser)
        updateReleaseScores(winner, loser, newReleaseScores)
        saveContest(winner, loser)
        if (getNewContest()) {
            setContestants(nextContestants)
            setNextContestants(getNewContest)
        } else {
            navigate('/wantlist')
        }
    }

    const handleExit = () => {
        navigate('/wantlist')
    }
    
    return (
        <H2HPageContainer>
            <Header>
                <LineIcon name="checkmark" style={{'color': '#41C3FE', 'fontSize': '40px', 'margin-right': '80px'}} onClick={handleExit}/>
            </Header>
            <H2HContentContainer>
                <Overlay/>
                <H2HReleasesContainer>
                    <H2HRelease onClick={()=>handleSelection(contestants[0], contestants[1])}>
                        <H2HReleaseArt coverImage={contestants[0].basic_information.cover_image}/>
                        <H2HReleaseInfoCard>
                            <H2HReleaseTitle>{contestants[0].basic_information.title} ({contestants[0].basic_information.year})</H2HReleaseTitle>
                            <H2HReleaseArtist>{contestants[0].basic_information.artists[0].name}</H2HReleaseArtist>
                            <H2HReleaseCat>{contestants[0].basic_information.labels[0].catno}</H2HReleaseCat>
                        </H2HReleaseInfoCard>
                    </H2HRelease>
                    <H2HRelease onClick={()=>handleSelection(contestants[1], contestants[0])}>
                        <H2HReleaseArt coverImage={contestants[1].basic_information.cover_image}/>
                        <H2HReleaseInfoCard>
                            <H2HReleaseTitle>{contestants[1].basic_information.title} ({contestants[1].basic_information.year})</H2HReleaseTitle>
                            <H2HReleaseArtist>{contestants[1].basic_information.artists[0].name}</H2HReleaseArtist>
                            <H2HReleaseCat>{contestants[1].basic_information.labels[0].catno}</H2HReleaseCat>
                        </H2HReleaseInfoCard>
                    </H2HRelease>
                    <H2HRelease>
                        <H2HReleaseArt coverImage={nextContestants[0].basic_information.cover_image}/>
                        <H2HReleaseInfoCard>
                            <H2HReleaseTitle>{nextContestants[0].basic_information.title} ({nextContestants[0].basic_information.year})</H2HReleaseTitle>
                            <H2HReleaseArtist>{nextContestants[0].basic_information.artists[0].name}</H2HReleaseArtist>
                            <H2HReleaseCat>{nextContestants[0].basic_information.labels[0].catno}</H2HReleaseCat>
                        </H2HReleaseInfoCard>
                    </H2HRelease>
                    <H2HRelease>
                        <H2HReleaseArt coverImage={nextContestants[1].basic_information.cover_image}/>
                        <H2HReleaseInfoCard>
                            <H2HReleaseTitle>{nextContestants[1].basic_information.title} ({nextContestants[1].basic_information.year})</H2HReleaseTitle>
                            <H2HReleaseArtist>{nextContestants[1].basic_information.artists[0].name}</H2HReleaseArtist>
                            <H2HReleaseCat>{nextContestants[1].basic_information.labels[0].catno}</H2HReleaseCat>
                        </H2HReleaseInfoCard>
                    </H2HRelease>
                </H2HReleasesContainer>
            </H2HContentContainer>
        </H2HPageContainer>
        // <div className='page-container'>
        //     <div id="game-container">
        //         <div id="releases-container">
        //             <div 
        //                 id={contestants[0].id} 
        //                 className="release" 
        //                 style={{
        //                     backgroundImage: `url(${contestants[0].basic_information.cover_image})`,
        //                     backgroundPosition: 'center',
        //                     backgroundSize: 'cover',
        //                     backgroundRepeat: 'no-repeat',
        //                     border: '2px solid blue'
        //                 }}
        //                 onClick={()=>handleSelection(contestants[0], contestants[1])}>
        //                     <p style={{'color': 'yellow', 'fontSize': 24, 'fontWeight': 'bold'}}>ELO SCORE: {contestants[0].ELOscore}</p>
        //                 </div>
        //             <div 
        //                 id={contestants[1].id} 
        //                 className="release" 
        //                 style={{
        //                     backgroundImage: `url(${contestants[1].basic_information.cover_image})`,
        //                     backgroundPosition: 'center',
        //                     backgroundSize: 'cover',
        //                     backgroundRepeat: 'no-repeat',
        //                     border: '2px solid green'
        //                 }}
        //                 onClick={()=>handleSelection(contestants[1], contestants[0])}>
        //                     <p style={{'color': 'yellow', 'fontSize': 24, 'fontWeight': 'bold'}}>ELO SCORE: {contestants[1].ELOscore}</p>
        //                 </div>
        //         </div>
        //         <div className="button-container">
        //                 <button type='button' onClick={()=>navigate('/wantlist')}>exit</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default HeadToHead