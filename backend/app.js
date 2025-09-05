const express=require('express');
const {Server}=require('socket.io');
const {createServer}=require('http');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser')

const app=express();
const PORT=8000;
const secretKey="absdtferr";

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

app.get("/login",(req,res)=>{
    const tocken=jwt.sign({_id:"afdsfhhcvvshgdn"},secretKey);
    res.cookie("token",tocken,{httpOnly:true,secure:true,sameSite:"none"}).send("login Successfuly");
})

io.use((socket,next)=>{
    cookieParser()(socket.request,socket.request.res,(err)=>{
          if(err)return next(err);

          const token=socket.request.cookies.token;

          if(!token)return next(new Error("authentication Error"));

          const decoded=jwt.verify(token,secretKey);
          next();
    })
    if(socket)
    next();
})

io.on("connection",(socket)=>{
    console.log("user connected");
    console.log("Id:",socket.id);
    socket.emit("welcome","welcome to the socket");
    socket.broadcast.emit("enter",`the new user ${socket.id} enter`);

    socket.on("message",(data)=>{
        console.log(data);
        io.to(data.room).emit("receved-message",data.message);
    })

    socket.on("join-room",(data)=>{
        socket.join(data);
        console.log(`user join ${data}`);
    })

    socket.on("disconnect",()=>{
        console.log(`user ${socket.id} disconnected`);
    })

})


server.listen(PORT,()=>console.log(`server started at port ${PORT}`));