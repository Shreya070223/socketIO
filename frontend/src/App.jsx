import React from 'react'
import { useEffect ,useState, useMemo} from 'react';
import {io} from 'socket.io-client'
import {Button, Container, TextField, Typography} from '@mui/material'

const App = () => {

  const socket=useMemo(()=>io("http://localhost:8000"),[]);

  useEffect(()=>{
   socket.on("connect",()=>{
    console.log("connected",socket.id);
   })

   socket.on("welcome",(mess)=>{
    console.log(mess);
   })

   socket.on("enter",(mess)=>{
    console.log(mess);
   })

   socket.on("receved-message",(data)=>{
    console.log(data);
   })

   return ()=>{
    socket.disconnect();
   }
  },[socket])

  const [message,setMessage]=useState("");

  const handleMessage=(e)=>{
    e.preventDefault();
    socket.emit("message",message);
    setMessage("");
  }

  return (
  <Container maxWidth='sm'>
    <Typography variant='h1' component="div" gutterBottom>
      Welcome to Socket.io
    </Typography>

    <form onSubmit={handleMessage}>
      <TextField value={message} onChange={(e)=>setMessage(e.target.value)} id="outlined-base" label="Outlined" variant="outlined"/>
      <Button type="submit" variant="contained" color="primary">Send</Button>
    </form>
  </Container>

  );
}

export default App;
