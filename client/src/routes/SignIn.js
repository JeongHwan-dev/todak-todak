import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'routes/css/SignIn.css';

axios.defaults.withCredentials = true;

// 로그인 페이지
function SignIn() {
  const url = `http://localhost:5000`;
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // (로그인) 이메일 핸들러
  const onUserEmailHandler = (event) => {
    setUserEmail(event.currentTarget.value);
  };

  // (로그인) 패스워드 핸들러
  const onUserPasswordHandler = (event) => {
    setUserPassword(event.currentTarget.value);
  };

  // 로그인 버튼 핸들러
  async function onSignInHandler(event) {
    await axios
      .post(url + 'sign-in', {
        method: 'POST',
        body: JSON.stringify({
          userEmail: userEmail,
          userPassword: userPassword,
        }),
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 400) {
          alert('로그인 성공');
          sessionStorage.setItem('accessToken', response.data.token);
          window.location.replace('/main');
        } else if (response.data.status === 401) {
          alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
        } else {
          alert('error');
        }
      })
      .catch((error) => {});
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>토닥토닥</h2>
        <input type="text" value={userEmail} onChange={onUserEmailHandler} placeholder="이메일" />
        <input
          type="password"
          value={userPassword}
          onChange={onUserPasswordHandler}
          placeholder="비밀번호"
        />
        <br />
        <button onClick={onSignInHandler}>로그인</button>
        <button
          onClick={() => {
            history.push({
              pathname: '/sign-up',
            });
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignIn;
