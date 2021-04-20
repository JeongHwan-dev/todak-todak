import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const url = `${window.location.origin}:5000`;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%"
  },
  spacingControl: {
    height: "100%",
    padding: theme.spacing(1),
  },
  userContainer: {
    height: "100%",
    width: "100%",
    boxShadow: "0px 2px 10px lightgray",
    borderRadius: "1rem",
    color: theme.palette.text.secondary
  },
  titleLeft: {
    height: "10%",
    width: "100%",
    fontWeight: "bold",
    lineHeight: "20px",
    borderBottom: "1px solid #e5e5e5"
  },
  titleText: {
    color: "black",
    verticalAlign: "middle",
    textAlign: "center",
    paddingTop: "10px"
  },
  userlist: {
    height: "85%",
    width: "100%",
    overflow: "auto",
    '&::-webkit-scrollbar': {
      width: "5px"
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: "#ff8a4e",
      borderRadius: "5px"
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: "white",
      borderRadius: "5px",
      boxShadow: "inset 0px 0px 2px white"
    },
  },
  user: {
    height: "60px",
    width: "100%",
    borderTop: "1px solid #e5e5e5",
    borderBottom: "1px solid #e5e5e5"
  },
  userPic: {
    width: "100%",
    height: "100%"
  },
  userNickname: {
    color: "black",
    textAlign: "left",
    marginBottom: "1px",
    "&:focus, &:active": {
      color: "black",
      outline: "none",
      fontWeight: "bold",
    },
  },
  userButton: {
    height: "100%",
    width: "100%",
    background: "white",
    border: "1px solid white",
    borderRadius: "1rem"
  },
  userlistFooter: {
    height: "5%",
    width: "100%",
    borderTop: "1px solid #e5e5e5"
  },
}));


const ChatList = () => {
  const [users, setUsers] = useState({});
  const classes = useStyles();
  async function onUserHandler(event) {
    const response = await axios.post(url + "/chatlist", {
      headers: { "Content-Type": "application/json" },
      from_user: sessionStorage.userid,
      withCredentials: true,
    });
    setUsers(response.data.users);
  }

  useEffect(() => {
    onUserHandler();
  }, []);

  const userName = Object.keys(users).map((id) => (
    <li key={id} className={classes.user}>
      <Grid container className={classes.spacingControl}>
        <Grid container item xs={3} className={classes.spacingControl}>
          <img src="./images/default_profile.png" className={classes.userPic} />
        </Grid>
        <Grid container item xs className={classes.spacingControl}>
          {/* <button key={id} onClick={() => enterRoom(id) } className={classes.userButton}> */}
          <Link className={classes.userButton} to={{ pathname: "/chat", state: {targetUser: id}}}>
            <p className={classes.userNickname}>{users[id]}</p>
          </Link>
          {/* </button> */}
        </Grid>
      </Grid>
    </li>
));

  return (
    <>
      <Grid container item>
        <div className={classes.userContainer}>
          <div className={classes.titleLeft}>
            <p className={classes.titleText}>메세지 목록</p>
          </div>
          <ul className={classes.userlist}>{userName}</ul>
        </div>
      </Grid>
    </>
  );
};

export default ChatList;
