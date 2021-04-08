import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppRouter from './Router';

axios.defaults.baseURL = `http://localhost:5000`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
