import { useState } from 'react';
import './App.css';
import Chat from './Chat'
import io from 'socket.io-client';


const socket = io.connect('http://localhost:3001');

function App() {

  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {

    if (userName !== "" && room !== "") {
      setShowChat(true);
      socket.emit("join_room", room);
    }
  }

  return (
    <div className="App">
      {
        !showChat
          ?
          (
            < div className="joinChatContainer">

              <h3>Join A Chat</h3>

              <input
                type='text'
                placeholder='Your Name Here'
                onChange={(e) => { setUserName(e.target.value) }}
              />

              <input
                type='text'
                placeholder='Room ID Here'
                onChange={(e) => { setRoom(e.target.value) }}
              />

              <button onClick={joinRoom}>Join a Room</button>

            </div>
          )
          :
          (
            <Chat socket={socket} userName={userName} room={room} />
          )
      }
    </div >
  );
}

export default App;
