import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";
import Home from "routes/Home";
import Profile from "routes/Profile";
import ChatContainer from "routes/ChatContainer";
import UserRelations from "routes/UserRelations";
import Hometown from "routes/Hometown";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/chat" component={ChatContainer} />
            <Route exact path="/user-relations">
              <UserRelations />
            </Route>
            <Route exact path="/hometown">
              <Hometown />
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
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
