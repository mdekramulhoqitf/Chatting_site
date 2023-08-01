import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { AiFillHome,AiFillMessage,AiFillSetting,AiOutlineLogout } from 'react-icons/ai';
// import profile from "../assets/profile.png"

import { Link,useLocation } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom'


const RootLayout = () => {

  const location = useLocation();
  console.log(location.pathname)

    // let navigate = useNavigate()

    // let handleLogOut = ()=>{
    //         navigate("/login")

    //   }



  return (


    <>
     <Grid container spacing={2}>
        <Grid item xs={1}>
        <div className='navber'>
          <div className='navberContainer'>

          {/* <img src={profile} /> */}

          <ul>
            <li>
              <Link to="/bachal/home" className={location.pathname == "/bachal/home" ? 'active' : 'icon'}>
              <AiFillHome />
              </Link>
            </li>
            <li>
            <Link to="/bachal/massage" className={location.pathname == "/bachal/massage" ? 'active' : 'icon'}>
              <AiFillMessage />
              </Link>

            </li>
            <li>
            <Link to="/bachal/settings" className={location.pathname == "/bachal/settings" ? 'active' : 'icon'}>
              <AiFillSetting />
              </Link>

            </li>
            <li>
            <Link to="/bachal/notification" className={location.pathname == "/bachal/notification" ? 'active' : 'icon'}>
              <AiFillSetting />
              </Link>

            </li>
            <li>
              {/* <Link to="/bachal/notification" className={location.pathname == "login" ? 'active' : 'icon'}>
              
              <AiOutlineLogout className='handleLogOut'/>
              </Link> */}


            </li>
          </ul>

          </div>
        </div>
        </Grid>
        <Grid item xs={11}>
        <Outlet/>
        </Grid>
        
      </Grid>
    </>


  )
}

export default RootLayout