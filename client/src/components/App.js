import React, { useState, useEffect } from "react";
import axios from "axios";
import AppRouter from "components/Router";
import "components/css/App.css";

// axios.defaults.baseURL = `http://localhost:5000`;
axios.defaults.withCredentials = true;

const accessToken = sessionStorage.getItem("accessToken");
if (sessionStorage.getItem("accessToken") !== "") {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  // 로그인 되어 있는 상태인지 확인
  useEffect(() => {
    setIsLoggedIn(sessionStorage.userid);
  }, []);

  return (
    <>
      <AppRouter isLoggedIn={Boolean(isLoggedIn)} />
    </>
  );
}

export default App;
