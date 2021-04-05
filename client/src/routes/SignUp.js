import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

// 회원가입 페이지
function SignUp() {
  const url = `http://localhost:5000`;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [pwWarning, setPwWarning] = useState(<></>);

  // 이메일 핸들러
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  // 비밀번호 핸들러
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  // 비밀번호(확인) 핸들러
  const onPasswordCheckHandler = (event) => {
    setPasswordCheck(event.currentTarget.value);
  };

  // 이름 핸들러
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  // 닉네임 핸들러
  const onNickNameHandler = (event) => {
    setNickName(event.currentTarget.value);
  };

  // (비밀번호 재확인 입력 시) 비밀번호 일치 확인
  useEffect(() => {
    if (password != "" || passwordCheck != "") {
      if (password != passwordCheck) {
        setPwWarning(<p>비밀번호가 일치하지 않습니다.</p>);
      } else {
        setPwWarning(<></>);
      }
    }
  }, [passwordCheck]);

  // 회원가입 버튼 핸들러
  async function onSignUpHandler(event) {
    event.preventDefault();
    if (password === passwordCheck) {
      await axios
        .post(url + '/sign-up', {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            nickName: nickName,
          }),
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          {
            if (response.data.status === 300) {
              sessionStorage.setItem('accessToken', response.data.token);
              window.location.replace('/sign-in');
            } else if (response.data.status === 301) {
              alert('필수 입력 사항이 모두 입력되지 않았습니다.');
            } else if (response.data.status === 302) {
              alert('이미 등록된 이메일 주소입니다.');
            } else if (response.data.status === 303) {
              alert('이미 등록된 별명입니다.');
            } else {
              alert('error');
            }
          }
        })
        .catch((error) => {
          alert('error');
        });
    }
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
        <h2>회원가입</h2>
        <label>이메일</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <label>비밀번호 재확인</label>
        <input type="password" value={passwordCheck} onChange={onPasswordCheckHandler} />
        <div>{pwWarning}</div>
        <label>이름</label>
        <input type="text" value={name} onChange={onNameHandler} />
        <label>별명</label>
        <input type="text" value={nickName} onChange={onNickNameHandler} />
        <br />
        <button
          onClick={() => {
            history.push({
              pathname: '/',
            });
          }}
        >
          이전
        </button>
        <button onClick={onSignUpHandler}>가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
