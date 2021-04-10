import React from 'react';
import Community from 'components/Community';
import Friend from 'components/Friend';

// 홈 페이지
const Home = () => {
  return (
    <div>
      <div className="home-title">
        <h1>토닥토닥</h1>
        <hr />
      </div>
      <div className="community-container">
        <Community />
      </div>
      <div>
        <Friend />
      </div>
    </div>
  );
};

export default Home;
