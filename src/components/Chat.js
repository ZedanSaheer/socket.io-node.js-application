import React, { useEffect, useState } from 'react'
import "./Chat.css"
import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({socket , name , room}) => {

    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);

    const sendMessage = async () => {
        if(message !== ""){
            const messageData = {
                room : room,
                author : name,
                message : message,
                time: new Date(Date.now()).getHours()+":" +  new Date(Date.now()).getMinutes(),
            }
            await socket.emit("sendMessage" , messageData)
            setMessages((list)=>[...list,messageData]);
            setMessage("");
        }
    }

    useEffect(() => {
        socket.on("recieveMessage",(data)=>{
           setMessages((list)=>[...list,data])
        })
    }, [socket])

    return (
        <div className="chat">
            <div className="chatHeader">
                <p>Live Chat</p>
            </div>
            <div className="chatBody">
               <ScrollToBottom className="messageContainer">
               {messages?.map((messageContent)=>{
                    return (<div className="message" id={name === messageContent?.author ? "you" : "other"}>
                            <div className="messageContent">
                                <p>{messageContent?.message}</p>
                            </div>
                            <div className="messageMeta">
                                <small>{messageContent?.time}</small>
                                <small>{messageContent?.author}</small>
                            </div>
                    </div>)
                })}
               </ScrollToBottom>
            </div>
            <div className="chatInput">
                <input type="text" value={message} placeholder="Enter text.." onChange={(e)=>{setMessage(e.target.value)}} onKeyPress={(e)=>e.key==="Enter" && sendMessage()}/>
                <button onClick={sendMessage} >&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
