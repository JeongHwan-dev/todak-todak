import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'routes/css/SignUp.css';

// 회원가입 페이지
function SignUp() {
  const url = `http://localhost:5000`;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [pwWarning, setPwWarning] = useState(<></>);

  // (회원가입 폼) 입력 핸들러
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordCheck') {
      setPasswordCheck(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'nickname') {
      setNickname(value);
    }
  };

  // (비밀번호 재확인 입력 시) 비밀번호 일치 확인
  useEffect(() => {
    if (password !== '' || passwordCheck !== '') {
      if (password !== passwordCheck) {
        setPwWarning(<p>비밀번호가 일치하지 않습니다.</p>);
      } else {
        setPwWarning(<></>);
      }
    }
  }, [passwordCheck]);

  // 회원가입 버튼 핸들러
  const onSignUpHandler = async (event) => {
    event.preventDefault();
    if (password === passwordCheck) {
      await axios
        .post(url + '/sign-up', {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            nickname: nickname,
          }),
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 300) {
            window.location.replace('/');
          } else if (response.data.status === 301) {
            alert('필수 입력 사항이 모두 입력되지 않았습니다.');
          } else if (response.data.status === 302) {
            alert('이미 등록된 이메일 주소입니다.');
          } else if (response.data.status === 303) {
            alert('이미 등록된 별명입니다.');
          } else {
            alert('error');
          }
        })
        .catch((error) => {
          alert('error');
        });
    }
  };

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
        <h2>회원가입</h2>
        <label>이메일</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={onChangeHandler}
          placeholder="이메일 입력"
          required
        />
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
          placeholder="비밀번호(숫자, 영문, 특수문자 조합 최소 8자)"
          required
        />
        <input
          name="passwordCheck"
          type="password"
          value={passwordCheck}
          onChange={onChangeHandler}
          placeholder="비밀번호 확인"
          required
        />
        <div>{pwWarning}</div>
        <label>이름</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={onChangeHandler}
          placeholder="이름 입력"
          required
        />
        <label>별명</label>
        <input
          name="nickname"
          type="text"
          value={nickname}
          onChange={onChangeHandler}
          placeholder="토닥이"
          required
        />
        <br />
        <div className="sign-btn-container">
          <button onClick={onSignUpHandler}>회원 가입하기</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
