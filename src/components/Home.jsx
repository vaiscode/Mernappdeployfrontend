import React, { useEffect, useState } from 'react';
import axios from "axios";
import axiosInstance from '../axiosinterceptor';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

const Home = () => {

    const [dataset,setData]=useState([]);
    var [update,setUpdate]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
      axiosInstance.get('/api/home').then((res)=>{
        console.log(res.data.data);
        setData(res.data.data);
      })
    },[]);
     
    const updateEmployee=(data)=>{
      setUpdate(update=true);
      navigate('/add',{state:{data,update}}); 
    }

    const deleteEmployee=(id)=>{
      try {
        axiosInstance.delete('/api/delete/'+id).then((res)=>{
        alert(res.data.message);
        window.location.reload(false);
      })
      } catch (error) {
        console.log(error);
      }
    }
   
    return (
      <div>
      <br/>
      <Typography sx={{textAlign:'center', fontSize:25, color:'White'}}>Welcome to Employee Dashboard</Typography>
      <br/>
      <TableContainer component={Paper} style={{maxWidth:800, maxHeight:600, margin:'auto'}}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead >
            <TableRow >
              <TableCell style={{fontFamily:'sans-serif',fontSize:20,fontWeight:600,textAlign:"center"}}>Employee Name</TableCell>
              <TableCell style={{fontFamily:'sans-serif',fontSize:20,fontWeight:600,textAlign:"center"}}>Designation</TableCell>
              <TableCell style={{fontFamily:'sans-serif',fontSize:20,fontWeight:600,textAlign:"center"}}>Location</TableCell>
              <TableCell style={{fontFamily:'sans-serif',fontSize:20,fontWeight:600,textAlign:"center"}}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {dataset.map((row) => (
          <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" onClick={()=>{updateEmployee(row)}}>Update</Button>
                  <Button variant="contained" color="error" onClick={()=>{deleteEmployee(row._id)}}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
  }

export default Home