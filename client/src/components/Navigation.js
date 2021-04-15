import React from "react";
import "components/css/Navigation.css";

// 네비게이션 컴포넌트
const Navigation = () => {
  // 로그아웃 핸들러
  const onLogOut = () => {
    sessionStorage.clear();
    window.location.replace("/");
  };

  // 마이페이지 이동 핸들러
  const onMoveMyPage = () => {
    window.location.replace("/mypage");
  };

  // 메인 페이지 이동 핸들러
  const onMoveHome = () => {
    window.location.replace("/");
  };

  return (
    <div id="navigation-container">
      <button onClick={onMoveHome}>Main</button>
      <button onClick={onMoveMyPage}>마이 페이지</button>
      <button onClick={onLogOut}>로그아웃</button>
    </div>
  );
};

export default Navigation;
