import React from 'react';
import Community from 'components/Community';
import Navigation from 'components/Navigation';

// 홈 페이지
const Home = () => {
  return (
    <div>
      <div className="home-title">
        <h1>Home Page</h1>
        <hr />
      </div>
      <div>
        <Navigation />
      </div>
      <div className="community-container">
        <Community />
      </div>
    </div>
  );
};

export default Home;
