import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material'
import '../Employeeform.css'
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';
import { useLocation, useNavigate } from 'react-router-dom';

const Employeeform = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [form,setForm]=useState({
    name:'',
    designation:'',
    location:'',
    salary:''
  })

   useEffect(()=>{
      if(location.state!=null){
        setForm({...form,name:location.state.data.name,designation:location.state.data.designation,location:location.state.data.location,
          salary:location.state.data.salary})
      }
      else{
        setForm({...form,name:'',designation:'',location:'',
          salary:''})   
      }
   },[])

   const inputHandler =(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  };

  const addData =()=>{
    if(location.state==null){
    axiosInstance.post("/api/add",form).then((res)=>{
      alert(res.data.message)
      navigate('/home');
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  else{
    axiosInstance.put("/api/edit/"+location.state.data._id,form).then((res)=>{
      alert(res.data.message);
      navigate('/home');
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}

  return (
    <div className='outer'> 
        <Typography sx={{textAlign:'center', fontSize:30, color:'White' , marginTop:10}}>Employee Form</Typography>
    <br/>
      <form/>
      <Grid>
        <div className='form'>
        <Typography variant='h6'>Please fill the required fields:</Typography>
        <br/>
          <TextField fullWidth label="Employee Name" 
          name="name" type='text' value={form.name}
          onChange={inputHandler} required id="fullWidth" />
          <br/><br/>
          <TextField fullWidth label="Designation" 
          name="designation" type='text' value={form.designation}
          onChange={inputHandler} required id="fullWidth" />
          <br/><br/>
          <TextField fullWidth label="Location" 
          name="location" type='text' value={form.location}
          onChange={inputHandler} required id="fullWidth" />
          <br/><br/>
          <TextField fullWidth label="Salary" 
          name="salary" type='number'  value={form.salary}
          onChange={inputHandler} required id="fullWidth" />
          <br/><br/>
          <div className='button'>
          <Button variant="contained" color='warning' onClick={addData}>Submit</Button>
          </div>
        </div>
        </Grid>
    </div>
  )
}

export default Employeeform