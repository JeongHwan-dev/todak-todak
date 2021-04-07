import React from 'react';
import { Link } from 'react-router-dom';

// 네비게이션 컴포넌트
const Navigation = () => {
  return (
    <div>
      <Link to="/profile">마이 페이지</Link>
    </div>
  );
};

export default Navigation;
