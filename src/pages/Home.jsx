import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Group from './Components/Group';
import FriendRequest from './Components/FriendRequest';
import Friend from './Components/Friend';
import UserList from './Components/UserList';
import MyGroup from './Components/MyGroup';
import Block from './Components/Block';
import { useSelector } from 'react-redux';
  
// import { Button } from '@mui/material'
import { getAuth,signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const auth = getAuth();
    let navigate = useNavigate()

    let loginUser = useSelector((state)=> state.loguser.loginUser)

    // let handleLogOut = ()=>{
    //     signOut(auth).then(()=>{
    //         navigate("/login")
    //     })
    //     .catch((error)=>{
    //         const errorCode = error.code;
    //         const errorMessage = error.massenge;
            
    //     })
    // }


    useEffect(()=>{
      if(loginUser == null){
        navigate("/login")
      }
    },[])

  return (
   
    <Grid container >
        <Grid item xs={4}>
          <Group/>
          <FriendRequest/>
        </Grid>
        <Grid item xs={4}>
          <Friend/>
          <MyGroup/>
        </Grid>
        <Grid item xs={4}>
          <UserList/>
          <Block/>
        </Grid>
        
      </Grid>
  )
}

export default Home