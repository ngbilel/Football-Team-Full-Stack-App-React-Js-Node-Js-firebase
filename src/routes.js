import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/home';
import SingIn from './Components/signIn'

const Routes = (props) => {
  return (
   
        <Layout>
          <Switch>
            <Route exact component={SingIn} path="/Sing_in"/>
            <Route exact component={Home} path="/"/>
          </Switch>
        </Layout>
  
  );
}

export default Routes;
