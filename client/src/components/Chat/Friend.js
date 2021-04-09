import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import io from "socket.io-client";

let endpoint = "http://localhost:5000";
let socket = io.connect(endpoint);

const Friend = () => {
  const url = `http://localhost:5000`;
  // const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);


  async function onUserHandler(event) {
    const response = await axios.get(url + '/friend');
    console.log(sessionStorage.userid)
    setUsers(response.data.users);
  }

  async function onRoomHandler(event) {
    try {
      const response = await axios
        .post(url + '/room', {
          headers: { 'Content-Type': 'application/json' },
          data: {
            user1: sessionStorage.userid,
            user2: event.target.getAttribute('data')
          },
          withCredentials: true,
        })
      console.log(response);
      if (response.data.status === 300) {
        window.location.replace(`/chat?name=${sessionStorage.userid}&room=${response.data.roomid}`);
      } else {
        alert('error');
      }
    }
    catch (error) {
      alert("error for some reason");
    }
  }

  const userName = users.map(
    ([id, user]) => (
      <li>
        {/* <Link to={`/chat?name=${user}&room=${user}`}>{id} : {user}</Link> */}
        <Link data={id} onClick={onRoomHandler} >{id} : {user}</Link>
      </li>
    )
  );

  return (
    <>
      <h4>채팅하기</h4>
      <ul>
        {userName}
      </ul>
      <div>
        <button onClick={onUserHandler}>유저 불러오기</button>
      </div>
    </>
  );
}

export default Friend;