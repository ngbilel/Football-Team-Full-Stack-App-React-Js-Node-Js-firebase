import React, {Component} from 'react'

class MatchesList extends Component {

    state={
        matchesList:[]
    }

    static getDerivedStateFromPrps(props,state){
        return state ={
            matchesList: props.matches
        }
    }

    render(){
        

        return (
            <div>
                List
            </div>
        )
    }
}

export default MatchesList;