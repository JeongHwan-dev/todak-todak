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

  // (로그인 폼) 입력 핸들러
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'userEmail') {
      setUserEmail(value);
    } else if (name === 'userPassword') {
      setUserPassword(value);
    }
  };

  // 강제로 Home page로 이동 (임시 함수)
  const onMoveHome = (event) => {
    window.location.replace('/community');
    //react는 single page라서 location을 직접 바꾸면 state가 다 날아갑니다...
  };

  // 로그인 버튼 핸들러
  async function onSignInHandler(event) {
    event.preventDefault();
    try {
      const response = await axios
        .post(url + '/', {
          headers: { 'Content-Type': 'application/json' },
          data: {
            userEmail: userEmail,
            userPassword: userPassword,
          },
          withCredentials: true,
        })
      console.log(response);
      if (response.data.status === 400) {
        alert('로그인 성공');
        sessionStorage.setItem('accessToken', response.data.access_token);
        sessionStorage.setItem('refreshToken', response.data.refresh_token);
        sessionStorage.setItem('userid', response.data.user_object.id);
        sessionStorage.setItem('nickname', response.data.user_object.nickname);
        sessionStorage.setItem('email', response.data.user_object.email);
        sessionStorage.setItem('usertype', response.data.user_object.usertype);
        window.location.replace('/community');
      } else if (response.data.status === 401) {
        alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
      } else {
        alert('error');
      }
    }
    catch (error) {
      alert("error for some reason");
    }
  }


  return (
    <div
      className="sign-container"
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
        <input
          name="userEmail"
          type="email"
          value={userEmail}
          onChange={onChangeHandler}
          placeholder="이메일"
          required
        />
        <input
          name="userPassword"
          type="password"
          value={userPassword}
          onChange={onChangeHandler}
          placeholder="비밀번호"
          required
        />
        <br />
        {/* 추후  onSignInHandler 교체 */}
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
