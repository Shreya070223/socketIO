const express=require('express');
const {Server}=require('socket.io');
const {createServer}=require('http');
const cors=require('cors');

const app=express();
PORT=8000;

app.use(cors({
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }));

const server=createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
});

app.get("/",(req,res)=>{
    return res.send("Hello world");
})

io.on("connection",(socket)=>{
    console.log("user connected");
    console.log("Id:",socket.id);
})


server.listen(PORT,()=>console.log(`server started at port ${PORT}`));