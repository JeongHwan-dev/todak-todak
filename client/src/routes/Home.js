import React from 'react';
import axios from 'axios';
import Community from '../components/Community';

const Home = () => {
  return (
    <div>
      <div className="title">
        <h4>Home Page</h4>
      </div>
      <div className="community-container">
        <Community />
      </div>
    </div>
  );
};

export default Home;
