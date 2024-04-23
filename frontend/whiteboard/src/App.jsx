import './App.css';
import React from 'react';
import Forms from './components/Forms/index'
import Room from './pages/Room';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import {Route, Routes} from "react-router-dom";
import io from "socket.io-client"
import {useState} from 'react';
import {useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";


const server = "http://localhost:8000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);
socket.on("connection", ()=>{
  console.log("Connected succefully")
})
socket.emit("takeThisData", "DATA")
const App=()=> {

  const [user, setUser] = useState(null);
  // const [userNo, setUserNo] = useState(0);
  // const [roomJoined, setRoomJoined] = useState(false);
  // const [user, setUser] = useState([]);

  useEffect(() =>{
    socket.on('userIsJoined',(data) =>
  {
      if(data.success){
        console.log("userJoined");
      }
      else
      {
      console.log("userJoined error");
    
      };
  });
})

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
    <div className="container">
      <Routes>
        
        <Route path ="/home" element= {<Forms uuid = {uuid} socket={socket} setUser={setUser}/>} />
        <Route path = "/:roomId" element={<Room user ={user} socket ={socket}/>} />
        <Route path="/signup" element = {<Register/>}/>
          
        <Route path="/" element= {<Login />}/>
            
        
      </Routes>
      {/* <Room /> */}
    </div>

  //   <div className="home">
  //   <ToastContainer />
  //   {roomJoined ? (
  //     <>
  //       <Sidebar users={users} user={user} socket={socket} />
  //       {user.presenter ? (
  //         <Room
  //           userNo={userNo}
  //           user={user}
  //           socket={socket}
  //           setUsers={setUsers}
  //           setUserNo={setUserNo}
  //         />
  //       ) : (
  //         <ClientRoom
  //           userNo={userNo}
  //           user={user}
  //           socket={socket}
  //           setUsers={setUsers}
  //           setUserNo={setUserNo}
  //         />
  //       )}
  //     </>
  //   ) : (
  //     <JoinCreateRoom
  //       uuid={uuid}
  //       setRoomJoined={setRoomJoined}
  //       setUser={setUser}
  //     />
  //   )}
  // </div>
  );
}

export default App;
