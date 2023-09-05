import React from 'react'
import Grid from '@mui/material/Grid';
import Group from './Components/Group';
import FriendRequest from './Components/FriendRequest';
import Friend from './Components/Friend';
import UserList from './Components/UserList';
import MyGroup from './Components/MyGroup';
import Block from './Components/Block';
import MassageGroup from './Components/MassageGroup';


const Massage = () => {
  return (
    <Grid container >
    <Grid item xs={4}>
      <MassageGroup/> 
      <Friend/>
    </Grid>
    <Grid item xs={8}>
    </Grid>
    
  </Grid>
  )
}

export default Massage