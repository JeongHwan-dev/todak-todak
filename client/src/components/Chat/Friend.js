import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Friend = () => {
  const url = `http://localhost:5000`;
  // const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('harry');
  const [room, setRoom] = useState('room');
  async function onUserHandler(event) {
    const response = await axios.get(url + '/friend');
    console.log(response.data.users);
    setUsers(response.data.users);
  }
  const userName = users.map(
    (user) => (
        <li>
          <Link to={`/chat?name=${user}&room=${room}`}>{user}</Link>
        </li>
    )
  );

  // const userName = users.map(
  //   (user) => {
  //     // setUser(user);

  //     return (
  //       <li>
  //         <button onClick={onChatHandler}>{user}</button>
  //         <button>{user}</button>
  //       </li>
  //     )
  //   }
  // );

  // const onChatHandler = (event) => {
  //   socket.emit("", user);
  // }

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