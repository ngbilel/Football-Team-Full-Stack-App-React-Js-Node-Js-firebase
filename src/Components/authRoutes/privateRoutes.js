import React from 'react';
import {Route , Redirect } from 'react-router-dom'

const PrivateRoutes = ({
    user,
    component: Comp, //rename
    ...rest //rest of props
}) =>{

    return <Route {...rest} component={(props)=>(
            user ?
            <Comp {...props} user={user}/> //Comp is equal to Dashboard
            :
            <Redirect to="/sign_in"/>
    )}/>
};

export default PrivateRoutes