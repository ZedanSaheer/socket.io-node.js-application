const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
app.use(cors()); 

const server = http.createServer(app);
const PORT = process.env.PORT
const io = new Server(server,{
    cors:{
        origin:"https://zedan-chat-app.herokuapp.com/",
        methods: ["GET","POST"],
    }
});


io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on("join", (data)=>{
        socket.join(data);
        console.log(`user with id ${socket.id} joined room : ${data}`);
    })

    socket.on("sendMessage",(data)=>{
        console.log(data);
        socket.to(data?.room).emit("recieveMessage",data);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected" ,socket.id); 
    })
})



server.listen(PORT,()=>{
    console.log("server is on");
})
