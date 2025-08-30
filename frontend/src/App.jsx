import React from 'react'
import { useEffect } from 'react';
import {io} from 'socket.io-client'

const App = () => {

  const socket=io("http://localhost:8000");

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

   return ()=>{
    socket.disconnect();
   }
  },[])

  return (
    <div>App</div>
  )
}

export default App;
