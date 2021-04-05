import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './routes/LandingPage';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Main from './routes/Main';

axios.defaults.baseURL = `http://localhost:5000`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
