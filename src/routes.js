import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/home';
import SingIn from './Components/signIn'
import Dashboard from './Components/admin/Dashboard'

const Routes = (props) => {
  return (
   
        <Layout>
          <Switch>
          <Route exact component={Dashboard} path="/dashboard"/>
            <Route exact component={SingIn} path="/sing_in"/>
            <Route exact component={Home} path="/"/>
          </Switch>
        </Layout>
  
  );
}

export default Routes;
