import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Friend = () => {
  const url = `http://localhost:5000`;
  // const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  
  async function onUserHandler(event) {
    const response = await axios.get(url + '/friend');
    console.log(sessionStorage.userid)
    setUsers(response.data.users);
    setRooms(response.data.rooms);
  }

  // const onMoveRoom = (e) => {
  //   for room[]
  //   if (sessionStorage.userid)
  // }

  const userName = users.map(
    (user) => (
        <li>
          <Link to={`/chat?name=${user}&room=${user}`}>{user}</Link>
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