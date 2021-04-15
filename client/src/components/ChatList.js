import React, { useState } from "react";
import axios from "axios";
import Chat from "routes/Chat";

const url = `http://elice-kdt-ai-track-vm-da-09.koreacentral.cloudapp.azure.com:5000`;

const ChatList = () => {
  const [users, setUsers] = useState({});
  const [room, setRoom] = useState(0);

  async function onUserHandler(event) {
    const response = await axios.get(url + "/chatlist");
    console.log(sessionStorage.userid);
    setUsers(response.data.users);
    console.log("response.data.users: ", response.data.users);
    console.log("keys: ", Object.keys(response.data.users));
  }

  const enterRoom = async (targetUser) => {
    const response = await axios.post(url + "/room", {
      headers: { "Content-Type": "application/json" },
      data: {
        user1: sessionStorage.userid,
        user2: targetUser,
      },
      withCredentials: true,
    });
    console.log(response);
    if (response.data.status === 300) {
      setRoom(response.data.roomid);
    } else {
      alert("방 참여에 실패");
    }
  };

  const userName = Object.keys(users).map((id) => (
    <li key={id}>
      <button key={id} onClick={() => enterRoom(id)}>
        {" "}
        {users[id]}{" "}
      </button>
    </li>
  ));

  return (
    <>
      <h4>채팅하기</h4>
      <ul>{userName}</ul>
      <div>
        <button onClick={onUserHandler}>유저 불러오기</button>
      </div>
      {room > 0 ? <Chat room={room} /> : ""}
    </>
  );
};

export default ChatList;
