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
    socket.emit("welcome","welcome to the socket");
    socket.broadcast.emit("enter",`the new user ${socket.id} enter`);

    socket.on("message",(data)=>{
        console.log(data);
        io.broadcast.emit("receved-message",data);
    })

    socket.on("disconnect",()=>{
        console.log(`user ${socket.id} disconnected`);
    })

})


server.listen(PORT,()=>console.log(`server started at port ${PORT}`));