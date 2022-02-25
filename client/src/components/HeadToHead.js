import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'
import Elo from "@pelevesque/elo";

const HeadToHead = ({ releases, setUserWantlist }) => {

    const [previousContests, setPreviousContests] = useState(() => {
        const savedPreviousContests = JSON.parse(localStorage.getItem("previous_contests"))
        return savedPreviousContests || {};
      })
    const [contestants, setContestants] = useState([releases[0], releases[1]])
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
            setContestants(getNewContest)
        } else {
            navigate('/wantlist')
        }
    }
    
    return (
        <div className='page-container'>
            <div id="game-container">
                <div id="releases-container">
                    <div 
                        id={contestants[0].id} 
                        className="release" 
                        style={{
                            backgroundImage: `url(${contestants[0].basic_information.cover_image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            border: '2px solid blue'
                        }}
                        onClick={()=>handleSelection(contestants[0], contestants[1])}>
                            <p style={{'color': 'yellow', 'fontSize': 24, 'fontWeight': 'bold'}}>ELO SCORE: {contestants[0].ELOscore}</p>
                        </div>
                    <div 
                        id={contestants[1].id} 
                        className="release" 
                        style={{
                            backgroundImage: `url(${contestants[1].basic_information.cover_image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            border: '2px solid green'
                        }}
                        onClick={()=>handleSelection(contestants[1], contestants[0])}>
                            <p style={{'color': 'yellow', 'fontSize': 24, 'fontWeight': 'bold'}}>ELO SCORE: {contestants[1].ELOscore}</p>
                        </div>
                </div>
                <div className="button-container">
                        <button type='button' onClick={()=>navigate('/wantlist')}>exit</button>
                </div>
            </div>
        </div>
    )
}

export default HeadToHead