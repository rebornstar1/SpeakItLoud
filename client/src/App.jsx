import { useEffect, useState, useMemo } from 'react'
import {io} from "socket.io-client"
import { Container, TextField, Typography, Button } from '@mui/material'
import './index.css'

function App() {
  const socket = useMemo(() => io("http://localhost:3000"),[]);

  const [message,setMessage] = useState("");
  const [room,setroom] = useState("");
  const [socketID,setsocketID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({message,room});
    socket.emit("message",{message,room});
    setMessage("");
    setroom("");
  }

  useEffect(()=> {
    socket.on("connect", () => {
      setsocketID(socket.id);
      console.log("connected", socket.id);
    })

    socket.on("welcome", (s) => {
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

                <Typography variant='h2' component="div" gutterBottom>
                  Speak It Loud
                </Typography>
                <br></br>

                <Typography variant='h5' component="div" gutterBottom>
                    {socketID}
                </Typography>
                <br></br>

                <form onSubmit={handleSubmit}>
                  <TextField value={message} onChange={(e)=> setMessage(e.target.value)} id="outlined-basic" label="Message" variant='outlined'/>
                  <br></br>
                  <br></br>
                  <br></br>
                  <TextField value={room} onChange={(e)=> setroom(e.target.value)} id="outlined-basic" label="Room" variant='outlined'/>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Button type="submit" variant="contained" color="primary">Send</Button>
                </form>

        </Container>
      );
    }

export default App;
