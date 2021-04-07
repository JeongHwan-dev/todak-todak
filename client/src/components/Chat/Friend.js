import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Friend = () => {
  const url = `http://localhost:5000`;
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  async function onUserHandler(event) {
    const response = await axios.get(url + '/friend');
    console.log(response.data.users);
    setUsers(response.data.users);
  }
  const userName = users.map(
    (user) => (
        <li>
          <Link to="/chatroom">{user}</Link>
        </li>
    )
  );

  // const userName = users.map(
  //   (user) => {
  //     // setUser(user);

  //     return (
  //       <li>
  //         {/* <button onClick={onChatHandler}>{user}</button> */}
  //         <button>{user}</button>
  //       </li>
  //     )
  //   }
  // );

  // async function onChatHandler(event) {
  //   event.preventDefault();
  //   await axios
  //     .post(url + '/chat', {
  //       method: 'POST',
  //       userName: user,
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.data.status === 200) {
  //         alert('채팅방 입장');
  //         window.location.replace('/chatroom');
  //       }
  //     })
  //     .catch((error) => {alert("error for some reason")});
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