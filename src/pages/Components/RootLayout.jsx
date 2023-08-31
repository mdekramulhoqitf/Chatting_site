import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { AiFillHome,AiFillMessage,AiFillSetting,AiOutlineLogout } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import profile from "../../assets/profile.png"
import { Link,useLocation } from 'react-router-dom';
import { getAuth,signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userdata } from '../../slices/user/userSlice';


const RootLayout = () => {
  
  const location = useLocation();
  console.log(location.pathname)
  
  // ========================================== PLM ==================================

    let userData = useSelector((state)=> state.loguser.loginUser);
    let navigate = useNavigate()
    let auth = getAuth()
    let dispatch = useDispatch()

    useEffect(()=>{
    
      if(userData == null){
        navigate("/login")
      }
    },[])



    if(userData == null){
      // navigate("/login")
      return
    }

    let handleLogOut = ()=>{
      signOut(auth).then(()=>{
        localStorage.removeItem("user")
        dispatch(userdata(null))
          navigate("/login")
      })
      .catch((error)=>{
          const errorCode = error.code;
          const errorMessage = error.massenge;
          
      })
  }
// ================================================ PLM ===================================



  return (


    <>

     <Grid container spacing={2}>
        <Grid item xs={1}>
        <div className='navber'>
          <div className='navberContainer'>

          <img src={profile} />
          <h4>
            {userData.displayName}
            </h4>
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
              <IoIosNotifications />
              </Link>

            </li>
            <li>
            <Link to="/bachal/notification" className={location.pathname == "/bachal/notification" ? 'active' : 'icon'}>
              <AiFillSetting />
              </Link>

            </li>
            <li>
              {/* <Link to="/bachal/notification" className={location.pathname == "login" ? 'active' : 'icon'}>
              
            </Link> */}

            </li>
            <li>
                 <Link>
                  <AiOutlineLogout className='icon' onClick={handleLogOut}/>
                 </Link>
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