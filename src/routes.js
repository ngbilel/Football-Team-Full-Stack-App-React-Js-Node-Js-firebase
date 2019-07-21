import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes'
import PublicRoute from './Components/authRoutes/publicRoutes'



import Home from './Components/home';
import SignIn from './Components/signIn'
import Dashboard from './Components/admin/Dashboard'


const Routes = (props) => {

  return (
        
        <Layout>
          <Switch>
            <PrivateRoute {...props} path="/dashboard"  exact component={Dashboard} />
            <PublicRoute {...props} path="/sign_in"  exact component={SignIn} restricted={true} />
            <PublicRoute {...props} path="/"  exact component={Home} restricted={false}  />
          </Switch>
        </Layout>
  
  );
}

export default Routes;
