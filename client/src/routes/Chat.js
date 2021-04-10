import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

const endpoint = "http://localhost:5000/chat";
const socket = io.connect(endpoint);

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {

      if (error) {
        alert(error);
      }
    });
  }, [endpoint, location.search]);

  socket.on("message2", msg => {
    setMessages([...messages, msg]);
  });

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const onClick = () => {
    socket.emit("message", { message, name, room });
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

    </div >
  );
}

export default Chat;
