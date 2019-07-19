import React, {Component} from 'react';
import {easePolyOut} from 'd3-ease';
import Animate from 'react-move/Animate';
import FeaturedPlayper from '../../../Resources/images/featured_player.png'


class Text extends Component {

    animateFirst = () => {

        return <Animate
                 show={true}
                 start={{
                     opacity:0,
                     x:503,
                     y:350
                                         
                 }}
                 enter={{
                    opacity:[1],
                    x:[273],
                    y:[350],
                    timing:{duration:500, ease:easePolyOut},

                 }}
                >
                {({opacity,x,y})=>{
                    return (
                        <div className="featured_first"
                             style={{
                                 opacity,
                                 transform:`translate(${x}px,${y}px)`
                             }}
                        >
                           League
                        </div>
                    )
                }}
               </Animate>

    }

    animateSecond = () => {

        return <Animate
        show={true}
        start={{
            opacity:0,
            x:503,
            y:486
                                
        }}
        enter={{
           opacity:[1],
           x:[273],
           y:[486],
           timing:{duration:500, ease:easePolyOut},

        }}
       >
       {({opacity,x,y})=>{
           return (
               <div className="featured_second"
                    style={{
                        opacity,
                        transform:`translate(${x}px,${y}px)`
                    }}
               >
                  Of Champions
               </div>
           )
       }}
      </Animate>
        
    }

    animatePlayer = () => {

        return <Animate
        show={true}
        start={{
            opacity:0,
           
                                
        }}
        enter={{
           opacity:[1],
           
           timing:{duration:500, ease:easePolyOut},

        }}
       >
       {({opacity,x=500,y=30})=>{
           return (
               <div className="featured_player"
                    style={{
                        opacity,
                        background: `url(${FeaturedPlayper})`,
                        transform:`translate(${x}px,${y}px)`
                    }}
               >
                  
               </div>
           )
       }}
      </Animate>
       

    }

    animateNumber = () => {
        return <Animate
                 show={true}
                 start={{
                     opacity:0,
                     rotation:0
                 }}
                 enter={{
                    opacity:[1],
                    rotation:[360],
                    timing:{duration:1000, ease:easePolyOut},

                 }}
                >
                {({opacity,rotate})=>{
                    return (
                        <div className="featured_number"
                             style={{
                                 opacity,
                                 transform:`translate(260px,50px) rotateY(${rotate}deg)`
                             }}
                        >
                           9
                        </div>
                    )
                }}
               </Animate>
    }
    render(){
        return (
            <div className="featured_text">
                 { this.animatePlayer()}
                { this.animateNumber()}
                { this.animateFirst()}
                { this.animateSecond()}
               

            </div>
        )
    }
}

export default Text;