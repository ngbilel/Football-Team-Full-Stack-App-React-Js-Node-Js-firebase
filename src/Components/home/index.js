import React from 'react'
import Featured from './featured'
import MatchesHome from './matches'
import MeetPlayers from './meetplayers'
import Promotion from './promotion'

const Home = () => {
    return (
        <div className="bck_blue"> 
        <Featured></Featured>
        <MatchesHome></MatchesHome>
        <MeetPlayers></MeetPlayers>
        <Promotion></Promotion>
        </div>
    )
}

export default Home