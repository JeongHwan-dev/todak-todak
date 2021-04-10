import React from 'react';
import { Link } from 'react-router-dom';
import 'components/css/Navigation.css';

// 네비게이션 컴포넌트
const Navigation = () => {
  // 로그아웃 핸들러
  const onLogOut = () => {
    sessionStorage.clear();
    window.location.replace('/');
  };

  const onMyPage = () => {
    window.location.replace('/mypage');
  };

  return (
    <div id="navigation-container">
      {/* <Link to="/mypage">마이 페이지</Link> */}
      <button onClick={onMyPage}>마이 페이지</button>
      <button onClick={onLogOut}>로그아웃</button>
    </div>
  );
};

export default Navigation;
