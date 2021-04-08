import React from 'react';
import axios from 'axios';
import AppRouter from 'components/Router';

axios.defaults.baseURL = `http://localhost:5000`;
axios.defaults.withCredentials = true;

// [+] 로그인 상태 여부 확인 useEffect()

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
