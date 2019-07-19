import React from 'react'
import {Link}  from 'react-router-dom'

import footballteamlogo from '../../Resources/images/logos/manchester_city_logo.png'

export const TeamLogo = (props) => {
    const template = <div
        className="img_coser"
        style={{
            width:props.width,
            height:props.height,
            background:`url(${footballteamlogo}) no-repeat`
        }}></div>;

    if(props.link){
        return (
            <Link to={props.linkTo} className="Link_logo">
              {template}
            </Link>
        )
        
    }else {
        return template
    }

}