import React from 'react'
import { useEffect ,useState, useMemo} from 'react';
import {io} from 'socket.io-client'
import {Button, Container, TextField, Typography, Stack} from '@mui/material'

const App = () => {

  const socket=useMemo(()=>io("http://localhost:8000",{
    withCredentials:true,
  }),[]);

  const [socketId,setSocketId]=useState("");
  const [message,setMessage]=useState("");
  const [room,setRoom]=useState("");
  const [preMess,setPreMess]=useState([]);
  const [roomName,setRoomName]=useState("");

  useEffect(()=>{
   socket.on("connect",()=>{
    setSocketId(socket.id);
    console.log("connected",socket.id);
   })

   socket.on("welcome",(mess)=>{
    console.log(mess);
   })

   socket.on("enter",(mess)=>{
    console.log(mess);
   })

   socket.on("receved-message",(data)=>{
    setPreMess((preMess)=>[...preMess,data]);
    console.log(data);
   })

   return ()=>{
    socket.disconnect();
   }
  },[socket])

  console.log(preMess);

  const handleMessage=(e)=>{
    e.preventDefault();
    socket.emit("message",{message,room});
    setMessage("");
  }

  const joinRoomhandler=(e)=>{
    e.preventDefault();
    socket.emit("join-room",roomName);
    setRoomName("");
  }


  return (
  <Container maxWidth='sm'>
    <Typography variant='h1' component="div" gutterBottom>
      Welcome to Socket.io
    </Typography>

    <Typography variant='h2' component="div" gutterBottom>
      {socketId}
    </Typography>

    <form onSubmit={joinRoomhandler}>
      <h5>Join room</h5>
      <TextField value={roomName} onChange={(e)=>setRoomName(e.target.value)} id="outlined-base" label="room name" variant="outlined"/>
      <Button type="submit" variant="contained" color="primary">Join</Button>
    </form>

    <form onSubmit={handleMessage}>
      <TextField value={message} onChange={(e)=>setMessage(e.target.value)} id="outlined-base" label="message" variant="outlined"/>
      <TextField value={room} onChange={(e)=>setRoom(e.target.value)} id="outlined-base" label="room" variant="outlined"/>
      <Button type="submit" variant="contained" color="primary">Send</Button>
    </form>

    <Stack>
      {
        preMess.map((m,i)=>(
          <Typography key={i} variant='h2' component="div" gutterBottom>
          {m}
        </Typography>
        ))
      }
    </Stack>

  </Container>

  );
}

export default App;
