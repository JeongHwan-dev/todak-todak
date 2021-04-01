import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";

function LoginPage() {
  // const dispatch = useDispatch();/
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // 로그인 이메일 핸들러
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  // 로그인 패스워드 핸들러
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  // 로그인 버튼 핸들러
  const onSubmitHandler = (event) => {
    event.preventDefault(); // Page refrash 방지
    console.log("UserEmail: ", Email);
    console.log("UserPwd: ", Password);

    // 로그인시 입력 정보
    let loginInfo = {
      email: Email,
      password: Password,
    };

    // dispatch(loginUser(loginInfo));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default LoginPage;
