import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const endpoint = 'http://elice-kdt-ai-track-vm-da-09.koreacentral.cloudapp.azure.com:5000';
const Chat = ({ room }) => {
  console.log("Chat.js rendering");
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const socketIO = useRef();

  useEffect(() => {
    socketIO.current = io(endpoint);
    socketIO.current.emit("join", {
      name: sessionStorage.nickname,
      room: room,
    });
    console.log("joined!");
    setMessages([]);

    socketIO.current.on("receiveMessage", (data) => {
      console.log(data, "emitMessage");
      setMessages((messages) => [...messages, data.greeting || data.message]);
    });
    return () => {
      socketIO.current.emit("leave");
    };
  }, [room]);

  const onClick = () => {
    socketIO.current.emit("sendMessage", {
      message: messageRef.current.value,
      name: sessionStorage.userid,
      room: room,
    });
    messageRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <p>
        <input type="text" onKeyPress={handleKeyPress} ref={messageRef} />
      </p>
      <p>
        <input type="button" onClick={onClick} value="Send" />
      </p>
    </div>
  );
};

export default Chat;
