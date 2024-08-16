import { useEffect, useState, useMemo } from 'react'
import {io} from "socket.io-client"
import { Container, TextField, Typography, Button } from '@mui/material'
import './index.css'

function App() {
  const socket = useMemo(() => io("http://localhost:3000"),[]);

  const [message,setMessage] = useState("");
  const [recieveMessage,setrecieveMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("message",message);
    setMessage("");
  }

  useEffect(()=> {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    })

    socket.on("welcome", (s) => {
      console.log(s);
    })

    socket.on("message", (s)=>{
      setrecieveMessage(s);
      console.log(s);
    })

    socket.on("receive-message",(data)=>{
       console.log(data);
    })

    return () => {
      socket.disconnect();
    }
  },[]);

  return (
        <Container maxWidth="sm">
            <Typography variant='h1' component="div" gutterBottom>
              Speak It Loud
            </Typography>

        <form onSubmit={handleSubmit}>
           <TextField value={message} onChange={(e)=> setMessage(e.target.value)} id="outlined-basic" label="Outlined" variant='outlined'/>
           <Button type="submit" variant="contained" color="primary">Send</Button>
            </form>
        </Container>
      );
    }

export default App;
