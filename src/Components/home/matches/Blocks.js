import React, {Component} from 'react'
import {firebaseMatches} from '../../../firebase'
import {firebaseLooper} from '../../ui/misc'
import {reverseArray } from '../../ui/misc'
import MatchesBlock from './matches_block'
import Slide from 'react-reveal/Slide'

class Blocks extends  Component {

    state ={
        matches:[]
    }

  componentDidMount(){
    firebaseMatches.limitToLast(6).once('value').then((snapshot)=>{
        const matches = firebaseLooper(snapshot);
        this.setState({
            matches: reverseArray(matches)
        })
    })
  }

  showMatches = (matches) =>(

        matches ? matches.map((match) => (
          <Slide bottom>
            <div className="item">
                <div className='warpper'>
                <MatchesBlock key={match.id} match={match} />  
                </div>
            </div>
          </Slide>
        )) : null
  )

  render(){

      return(
        <div className= "home_matches">
            {this.showMatches(this.state.matches)}
        </div>
      )
  }
}

export default Blocks