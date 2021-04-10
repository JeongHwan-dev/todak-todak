import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import MyPage from 'routes/MyPage';
import Community from './Community';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Community />
            </Route>
            <Route exact path="/mypage">
              <MyPage />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="profile">
              <Profile />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
