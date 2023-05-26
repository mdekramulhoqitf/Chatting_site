import React from 'react'

import {Grid} from '@mui/material';

import ragistrationimage from "../assets/Ragistration_image.png"
import Headingforleg from './Components/Headingforleg';



const Ragistration = () => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={6}>
      <Headingforleg className="headingreglog" title="Get started with easily register"/>
    </Grid>
    <Grid item xs={6}>
      <img className='regi_image' src={ragistrationimage}/>
    </Grid>
  </Grid>
  )
}

export default Ragistration