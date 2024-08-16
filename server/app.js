import express from 'express'
import { Server } from 'socket.io';
import { createServer } from "http";
import cors from 'cors'

const app = express();
const server = new createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET","POST"],
        credentials: true,
    }
});

app.use(cors());

const PORT  = 3000;

app.get("/",(req,res) => 
{
    res.send("Hello World");
});

io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);

    socket.on("message", (data) => {
        console.log(data.room,data.message);
        io.to(data.room).emit("receive-message",data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected",socket.id);
    })
});

server.listen(PORT, () => {
    console.log(`The Server is Running on the Port ${PORT}`)
});