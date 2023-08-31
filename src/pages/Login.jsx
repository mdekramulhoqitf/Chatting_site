// import React from 'react'
import React, { useEffect, useState } from 'react'

import {Grid,TextField,Button,Alert} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Headingforleg from './Components/Headingforleg';
import loginimage from "../assets/logingimage.png"
import google from "../assets/Google.png"
import { getAuth, signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup,sendEmailVerification} from "firebase/auth";
import { useNavigate,Link } from 'react-router-dom';
import {IoIosEyeOff,IoIosEye} from 'react-icons/io'
import {toast} from 'react-toastify';
import { useSelector , useDispatch } from 'react-redux';
import { userdata } from '../slices/user/userSlice';






let initialValues = {
  email:"",
  password:"",  
  loading:false,
  eye_l:false,
}



const Login = () => {


  const notify = (mes) => toast(mes);


    const provider = new GoogleAuthProvider();

    const auth = getAuth();

    let navigate = useNavigate()

    let dispatch = useDispatch()

    let userData = useSelector((state)=> state.loguser.loginUser);


      let [values,setValues] = useState(initialValues)
      let [error,setError] = useState("")


      let Handlevalues = (e) => {


    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
    console.log(values)
  }

  useEffect(()=>{

    if(userData != null){
      navigate("/bachal/home")
    }
  },[])

  let handleSubmit = ()=>{
    let {email,password}= values

    // if(!email){
    //   setValues({
    //     ...values,
    //     error:"Please Enter Your email"
    //   })
    //   return
    // }
    // if(!password){
    //   setValues({
    //     ...values,
    //     error:"Please Enter Your password"
    //   })
    //   return
    // }

    setValues({
      ...values,
      loading:true
    })

    signInWithEmailAndPassword(auth, email, password).then((user)=>{
      
      // sendEmailVerification(auth.currentUser).then(()=>{
      //   console.log(user);
      // });
      
      // if(user.user.emailVerified){
      //     notify("login succesful")
      //   }else{
      //       notify("Please varificatiobn")
      //     }

      console.log(user.user)

          dispatch(userdata(user.user))
          localStorage.setItem("user",JSON.stringify(user.user))
          navigate("/bachal/home")




      setValues({
        email:"",
        password:"",
        loading:false
      })
      
    }).catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.massenge;
      setError(error.code)

      setValues({
        ...values,
        password:"",
        loading:false
      })
  })
  }


  let handleGoogleLogin = ()=>{
    signInWithPopup(auth, provider).then((result) =>{
      console.log(result)
    })
  }


    return (
      <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className='regContainer'>
             <Headingforleg className="headingreglog" title="Login to your account!"/>
             <img onClick={handleGoogleLogin} className='google' src={google}/>
  
             <div className='regInput'>
              <TextField value={values.email} onChange={Handlevalues} name='email' type='email' id="outlined-basic" label="Email Address" variant="outlined" />
               {error && <Alert severity="error">{error.includes("auth/user-not-found") && "User Not Found"}</Alert>}
             </div>
             <div className='regInput'>
               <TextField value={values.password} onChange={Handlevalues} name='password' type={values.eye_l ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined" />
                {error && <Alert severity="error">{error.includes("auth/wrong-password") && "Wrong Password" }</Alert>}
                
                <div onClick={()=>{setValues({...values,eye_l:!values.eye_l })}} className='eye_l'>
              {values.eye_l
              ? 
              <IoIosEyeOff/>
              :
              <IoIosEye/>
              }
            </div>

             </div>

           

  
              {values.loading
             ?
             <LoadingButton loading variant="outlined">
             Submit
             </LoadingButton>
             :
          <>
          <Button className='logIn_btn' onClick={handleSubmit} variant="contained">Log In to connect</Button>
          </>
           
             }

                 <Alert className='forgot_pass' severity="success" style={{marginButtom: "20px"}}>
                      Forgot Password <strong><Link className='forgot_clk' to="/forgotpassword">Click Here</Link></strong>
                 </Alert>


             <div>
                 <Alert className='Al_Rstrtion' severity="success" style={{marginButtom: "20px"}}>
                 Don’t have an account? <strong><Link className='sign_up' to="/">Ragistration</Link></strong>
                 </Alert>
             </div>

        </div>


      </Grid>
      <Grid item xs={6}>
        <img className='regi_image' src={loginimage}/>
      </Grid>
    </Grid>
    )
  }

  export default Login