const express=require('express');
const {Server}=require('socket.io');
const {createServer}=require('http');

const app=express();
PORT=8000;

const server=createServer(app);

const io=new Server(server);

app.get("/",(req,res)=>{
    return res.send("Hello world");
})

io.on("connection",(socket)=>{
    console.log("user connected");
    console.log("Id:",socket.id);
})


app.listen(PORT,()=>console.log(`server started at port ${PORT}`));