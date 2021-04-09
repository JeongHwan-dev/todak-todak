import React, { useState } from 'react';
import io from "socket.io-client";

let endpoint = "http://localhost:5000";
let socket = io.connect(endpoint);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  socket.on("message", msg => {
    setMessages([...messages, msg])
  });

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const onClick = () => {
    setMessage("");
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map(msg => (<p>{msg}</p>))}
      </div>
      <p>
        <input type="text" onChange={onChange} value={message} />
      </p>
      <p>
        <input type="button" onClick={onClick} value="Send" />
      </p>
    </div>
  );
}

export default Chat;