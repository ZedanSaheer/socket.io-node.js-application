import React, { useState } from 'react'
import "./Chat.css"

const Chat = ({socket , name , room}) => {

    const [message,setMessage] = useState("");

    const sendMessage = async () => {
        if(message !== ""){
            const messageData = {
                room : room,
                author : name,
                message : message,
                time: new Date(Date.now()).getHours()+":" +  new Date(Date.now()).getMinutes(),
            }
            await socket.emit("sendMessage" , messageData)
        }
    }

    return (
        <div className="chat">
            <div className="chatHeader">
                <p>Live Chat</p>
            </div>
            <div className="chatBody">

            </div>
            <div className="chatInput">
                <input type="text" placeholder="Enter text.." onChange={(e)=>{setMessage(e.target.value)}}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
