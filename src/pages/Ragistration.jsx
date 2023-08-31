import React, { useState } from 'react'

import {Grid,TextField,Button,Alert} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import ragistrationimage from "../assets/Ragistration_image.png"
import Headingforleg from './Components/Headingforleg';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,GoogleAuthProvider,signInWithPopup,updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate,Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import {IoIosEyeOff,IoIosEye} from 'react-icons/io'

let initialValues = {
  email:"",
  fullName:"",
  password:"",
  loading:false,
  error:"",
  eye:false,
}

const Ragistration = () => {

  const auth = getAuth();
  const db = getDatabase();

  let navigate = useNavigate()
  
  let [values,setValues] = useState(initialValues)

  let Handlevalues = (e) => {


    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
    console.log(values)
  }


  let handleSubmit = ()=>{

    let {email,fullName,password}= values

    if(!email){
      setValues({
        ...values,
        error:"Please Enter Your email"
      })
      return
    }

    if(!fullName){
      setValues({
        ...values,
        error:"Please Enter Your fullname"
      })
      return
    }

    var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(!password || !pattern.test(password)){
      setValues({
        ...values,
        error:"Please Enter Your password Includes Capital Lower Symble Number Plan"
      })
      return
    }
    
    setValues({
      ...values,
      loading:true
    })

    createUserWithEmailAndPassword(auth,email,password).then((user)=>{



      updateProfile(auth.currentUser, {
        displayName: values.fullName , photoURL: "https://i.ibb.co/Jv9ybwB/user.png"
      }).then(() => {
        // sendEmailVerification(auth.currentUser).then(()=>{
        
                    
        //   });

          set(ref(db, 'users/'+user.user.uid), {
            username: values.fullName,
            email: values.email,
            profile_picture : user.user.photoURL

        });
      });

   
      setValues({
        email:"",
        fullName:"",
        password:"",
        loading:false
      })
      navigate("/login")
    })
  }


  return (

<Grid container spacing={2}>
    <Grid item xs={6}>
      <div className='regContainer'>
           <Headingforleg className="headingreglog" title="Get started with easily register"/>
           <p>Free register and you can enjoy it</p>

           <div className='regInput'>
            <TextField value={values.email} onChange={Handlevalues} name='email' type='email' id="outlined-basic" label="Email Address" variant="outlined" />
              {values.error?.includes("email") && <Alert severity="error">This is an error alert — check it out!</Alert>}
           </div>

           <div className='regInput'>
            <TextField value={values.fullName} onChange={Handlevalues} name='fullName' id="outlined-basic" label="FullName" variant="outlined" />
            {values.error?.includes("name") && <Alert severity="error">This is an error alert — check it out!</Alert>}
           </div>

           <div className='regInput ApnarEx'>
            <TextField value={values.password} onChange={Handlevalues} name='password' type={values.eye ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined"
            
            
            />
            {values.error?.includes("password") && <Alert severity="error">{values.error}</Alert>}
            {/* {error && <Alert severity="error">{error.includes("This is an error alert — check it out!") && "Please Enter Your password Includes Capital Lower Symble Number Plan" }</Alert>} */}

       
            <div onClick={()=>{setValues({...values,eye:!values.eye })}} className='eye'>
              {values.eye
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
           <Button onClick={handleSubmit} variant="contained">Sign up</Button>
             }

           <div>
             <Alert className='AlrAccount' severity="success" style={{marginButtom: "20px"}}>
                 Already you have an Account ? <strong><Link className='sign_in' to="/login">Sign In</Link></strong>
             </Alert>
             </div>

           
      </div>

    </Grid>
    <Grid item xs={6}>
      <img className='regi_image' src={ragistrationimage}/>
    </Grid>
  </Grid>
  )
}

export default Ragistration