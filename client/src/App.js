import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';
import Main from 'routes/Main';

axios.defaults.baseURL = `http://localhost:5000`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
