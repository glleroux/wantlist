import { useState } from "react";
import _ from 'lodash'
import Elo from "@pelevesque/elo";

const HeadToHead = ({ releases, setUserWantlist }) => {

    const [previousContests, setPreviousContests] = useState({})
    const [contestants, setContestants] = useState([releases[0], releases[1]])
    const [numRounds, setNumRounds] = useState(0)
    const [finishedPlaying, setFinishedPlaying] = useState(false)

    console.log('prev contests: ', previousContests)
    console.log('prev contents length: ', Object.keys(previousContests).length)
    console.log('rounds played: ', numRounds)

    
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
        const tempState = {...previousContests}
        
        if (!tempState[contestantA.id]) { //if contestantA doesn't exist in list of previous contests                  
            tempState[contestantA.id] = [contestantB.id] //create contestantA and add contest against contestantB
        } else {
            if (!tempState[contestantA.id].includes(contestantB.id)) { //if contestantA does exist but hasn't contestedB before 
                tempState[contestantA.id].push(contestantB.id) //add B
            }                                                        
        }

        if (!tempState[contestantB.id ]) {
            tempState[contestantB.id] = [contestantA.id]
        } else {
            if (!tempState[contestantB.id].includes(contestantA.id)) {
                tempState[contestantB.id].push(contestantA.id) 
            } 
        }

        setPreviousContests(tempState)
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
        setNumRounds(numRounds + 1)
        if (getNewContest()) {
            setContestants(getNewContest)
        } else {
            setFinishedPlaying(true)
        }
    }
    
    return (
        <div className='page-container'>
            {finishedPlaying ? 
                <div>finished</div>
            
            :
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
            </div>
            }
            
        </div>
    )
}

export default HeadToHead