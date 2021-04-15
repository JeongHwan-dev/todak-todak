import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";
import Home from "routes/Home";
import Profile from "routes/Profile";
import MyPage from "routes/MyPage";
import Chat from "routes/Chat";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {/* {isLoggedIn && <Navigation />} */}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/mypage">
              <MyPage />
            </Route>
            <Route exact path="/chat" component={Chat} />
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
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
