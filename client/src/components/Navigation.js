import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

// 네비게이션 컴포넌트
const Navigation = () => {
  const history = useHistory();

  // 로그아웃 핸들러
  const onLogOut = () => {
    // 세션 스토리지 비우고
    sessionStorage.clear();
    // 로그인 페이지로 이동
    history.push({
      pathname: '/',
    });
  };

  return (
    <div>
      <Link to="/profile">마이 페이지</Link>
      <button onClick={onLogOut}>로그아웃</button>
    </div>
  );
};

export default Navigation;
