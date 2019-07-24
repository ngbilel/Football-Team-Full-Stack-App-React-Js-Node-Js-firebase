import React from 'react';
import Layout from './Hoc/Layout';
import {Switch} from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes'
import PublicRoute from './Components/authRoutes/publicRoutes'



import Home from './Components/home';
import SignIn from './Components/signIn'
import Dashboard from './Components/admin/Dashboard'
import AdminMatches from './Components/admin/matches'
import AddEditMatch from './Components/admin/matches/addEditMatch'
import AdminPlayers from './Components/admin/players'
import AddEditPlayers from './Components/admin/players/addEditPlayers'
import TheTeam from './Components/theTeam'
import TheMatches from './Components/theMatches'
import NotFound from './Components/ui/not_found'


const Routes = (props) => {

  return (
        
        <Layout>
          <Switch>
            <PrivateRoute {...props} path="/admin_players/add_players"  exact component={AddEditPlayers} />
            <PrivateRoute {...props} path="/admin_players/add_players/:id"  exact component={AddEditPlayers} />
            <PrivateRoute {...props} path="/admin_players"  exact component={AdminPlayers} />
            <PrivateRoute {...props} path="/admin_matches/edit_match"  exact component={AddEditMatch} />
            <PrivateRoute {...props} path="/admin_matches/edit_match/:id"  exact component={AddEditMatch} />
            <PrivateRoute {...props} path="/admin_matches"  exact component={AdminMatches} />
            <PrivateRoute {...props} path="/dashboard"  exact component={Dashboard} />
            <PublicRoute {...props} path="/sign_in"  exact component={SignIn} restricted={true} />
            <PublicRoute {...props} path="/the_team"  exact component={TheTeam} restricted={false}  />
            <PublicRoute {...props} path="/the_matches"  exact component={TheMatches} restricted={false}  />
            <PublicRoute {...props} path="/"  exact component={Home} restricted={false}  />
            <PublicRoute {...props}   exact component={NotFound} restricted={false}  />

          </Switch>
        </Layout>
  
  );
}

export default Routes;
