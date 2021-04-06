import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';
import Home from 'routes/Home';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/community" component={Home} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
