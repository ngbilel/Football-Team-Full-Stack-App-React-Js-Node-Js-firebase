import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes'


import Home from './Components/home';
import SingIn from './Components/signIn'
import Dashboard from './Components/admin/Dashboard'


const Routes = (props) => {

  return (
        
        <Layout>
          <Switch>
            <PrivateRoute {...props} path="/dashboard"  exact component={Dashboard} />
            <Route exact component={SingIn} path="/sing_in"/>
            <Route exact component={Home} path="/"/>
          </Switch>
        </Layout>
  
  );
}

export default Routes;
