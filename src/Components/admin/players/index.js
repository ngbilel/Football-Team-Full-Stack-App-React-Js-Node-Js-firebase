import React, {Component} from 'react'
import {Link} from 'react-router-dom';


import AdminLayout from '../../../Hoc/AdminLayout';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import {firebasePlayers} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../ui/misc'


class AdminPlayers extends Component {

    state = {
        isLoading: true,
        players:[]
    }

    componentDidMount(){
        firebasePlayers.once('value').then(snapshot=>{
            const players = firebaseLooper(snapshot);
            this.setState({
                isLoading:false,
                palyers:reverseArray(players)
            })
        })
    }

    render(){

        return (
            <AdminLayout>
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.palyers ?
                                    this.state.palyers.map((player,i)=>(
                                        <TableRow key={i}>
                                            <TableCell> 
                                                <Link to={`/admin_players/add_players/${player.id}`}>
                                                    {player.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell> 
                                            <Link to={`/admin_players/add_players/${player.id}`}>
                                                    {player.lastName}
                                                </Link>
                                            </TableCell>     
                                            <TableCell> {player.number}</TableCell>  
                                            <TableCell> {player.position}</TableCell>                                                                                         
                                        </TableRow>
                                    ))
                                : ''

                            }
                        </TableBody>
                    </Table>
                </Paper>
                <div className="admin_progress">
                    {
                        this.state.isLoading ? 
                        <CircularProgress thickness={7} style={{color:'#98c5e9'}}/>
                        :
                        ""
                    }
                </div>
            </div>
        </AdminLayout>
        )
    }
}

export default AdminPlayers;
