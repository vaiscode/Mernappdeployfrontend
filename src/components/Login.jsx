import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState();
  const inputHandler = (e)=>{
    setUser({...user,[e.target.name]:e.target.value});
    console.log(user);
  };
  const addHandler = ()=>{
    console.log(user);
    axios.post("/api/login",user).then((res)=>{
      alert(res.data.message);
      sessionStorage.setItem('userToken',res.data.token);
      navigate('/home');
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className='loginform'>
        <Typography variant='h5' fontWeight={600}>Employee App Login</Typography>
        <br />
        <TextField name="username" type='text' onChange={inputHandler} label='Username' />
        <br />
        <br />
        <TextField name="password" type='password' onChange={inputHandler} label='Password' />
        <br />
        <br />
        <Button variant='contained' onClick={addHandler}>Login</Button>
        <br />
        <br />
    </div>
  )
}

export default Login