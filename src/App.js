import './App.css';
import io from "socket.io-client"
import { useState } from 'react';
import Chat from './components/Chat';

const socketURL =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'https://localhost:5000';

const socket = io.connect(socketURL, {secure: true});

function App() {

  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [warningName, setWarningName] = useState(false)
  const [warningRoom, setWarningRoom] = useState(false)

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join", room)
      setShowChat(true);
    }
    if (name === "") { setWarningName(true); } else { setWarningName(false); }
    if (room === "") { setWarningRoom(true); } else { setWarningRoom(false); }

  }

  return (
    <div className="app">
      {!showChat ?
        (<>
          <h1>Welcome to Zedan's chat app</h1>
          <div className="joinForm">
            <input type="text"
              placeholder="Name.."
              onChange={(event) => { setName(event.target.value) }}
              className="joinInput"
            />
            {warningName && (<span className="warning">Please enter a name</span>)}
            <input type="text"
              placeholder="Room.."
              onChange={(event) => { setRoom(event.target.value) }}
              onKeyPress={(e) => e.key === "Enter" && joinRoom()}
              className="joinInput"
            />
            {warningRoom && (<span className="warning">Please enter the room</span>)}
            <button onClick={joinRoom} className="joinButton">Join Room</button>
          </div>
          <div className="joinInfo">
            <p>this chat application is basic implementation model of socket.io(websocket connection) on a node/express server and react. the application lasts only per refresh and basically the users have to input a name and similar room name to join the same chat room!</p>
          </div>
        </>)
        :
        (<Chat socket={socket} name={name} room={room} />)
      }
    </div>
  );
}

export default App;
