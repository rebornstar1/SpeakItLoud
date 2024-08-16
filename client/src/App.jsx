import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {io} from "socket.io-client"

function App() {

  const socket = io("http://localhost:3000")

  useEffect(()=> {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    })

    socket.on("welcome", (s) => {
      console.log(s);
    })
  },[]);

  return (
     <div>This is for testing Purposes</div>
  )
}

export default App
