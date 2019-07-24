import React, {Component} from 'react'
import {easePolyOut} from 'd3-ease'
import NodeGroup from 'react-move/NodeGroup'

class MatchesList extends Component {

    state={
        matchesList:[]
    }

    showMatches = () =>(
        this.state.matchesList ?
            <NodeGroup
            
                data={this.state.matchesList}
                keyAccessor={(data)=>data.id}
                start = {()=>({
                    opacity:0,
                    x:-200  
                })}

                enter={(data,i)=>({
                    opacity:[1],
                    x:[0],
                    timing:{
                        duration:500,
                        delay:i*50,
                        ease:easePolyOut
                    }
                })}

                update={(data,i)=>({
                    opacity:[1],
                    x:[0],
                    timing:{
                        duration:500,
                        delay:i*50,
                        ease:easePolyOut
                    }
                })}

                leave={(data,i)=>({
                    opacity:[0],
                    x:[-200],
                    timing:{
                        duration:500,
                        delay:i*50,
                        ease:easePolyOut
                    }
                })}

            >
                {
                    (nodes)=>(
                        <div>
                            {
                                nodes.map(({key,data,state:{x,opacity}})=>( //state of the nodegroup
                                    <div 
                                        key={key} 
                                        className="match_box_big"
                                        style={{
                                            opacity,
                                            transform:`translate(${x}px)`
                                        }}
                                    >
                                        result
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </NodeGroup>
        :
            null
    )

    static getDerivedStateFromProps(props,state){
        return state ={
            matchesList: props.matches
        }
    }

    render(){
        console.log(this.state.matchesList);

        return (
            <div>
                {this.showMatches()}
            </div>
        )
    }
}

export default MatchesList;