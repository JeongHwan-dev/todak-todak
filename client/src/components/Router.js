import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
<<<<<<< HEAD
=======
import MyPage from 'routes/MyPage';
import Navigation from './Navigation';
>>>>>>> origin/Dev/Community
import Chat from 'routes/Chat';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
<<<<<<< HEAD
      {/* <Switch> */}
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/community" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/chat" component={Chat} />
      {/* </Switch> */}
=======
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
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
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>
          </>
        )}
      </Switch>
>>>>>>> origin/Dev/Community
    </Router>
  );
};

export default AppRouter;
