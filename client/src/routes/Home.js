import React from "react";
import Community from "components/Community";
import ChatList from "components/ChatList";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paperHeader: {
    height: theme.spacing(8),
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "0rem 0rem 1rem 1rem",
    border: "1px solid lightgray",
    background: "#ff8a4e",
  },
  paperHeaderInside: {
    height: theme.spacing(4),
    padding: theme.spacing(1),
    fontWeight: "bold",
    color: "white",
    fontFamily: "Spoqa Han Sans Neo",
    textAlign: "center",
  },
  paperHeaderInsideTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: "1.5vw",
    height: theme.spacing(4),
    fontFamily: "Spoqa Han Sans Neo",
    textAlign: "center",
  },
  newPosting: {
    padding: theme.spacing(2),
    height: theme.spacing(28),
    textAlign: "center",
    borderRadius: "0.5rem",
    // border: "1px solid lightgray",
  },
  surrounding: {
    padding: theme.spacing(2),
    height: theme.spacing(90),
    textAlign: "center",
    borderRadius: "0.5rem",
    border: "1px solid lightgray",
  },
  chatting: {
    padding: theme.spacing(2),
    height: theme.spacing(50),
    textAlign: "center",
    borderRadius: "0.5rem",
    border: "1px solid lightgray",
  },
  localSituation: {
    padding: theme.spacing(2),
    height: theme.spacing(30),
    textAlign: "center",
    borderRadius: "0.5rem",
    border: "1px solid lightgray",
  },
  vote: {
    padding: theme.spacing(1),
    height: theme.spacing(22),
    textAlign: "center",
    borderRadius: "0.5rem",
    border: "1px solid lightgray",
  },
  paperSide: {
    height: theme.spacing(20),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  community: {
    height: theme.spacing(100),
    textAlign: "center",
    borderRadius: "0.5rem",
    // border: "1px solid lightgray",
  },
  linkBtn: {
    border: 0,
    outline: 0,
    background: "none",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Spoqa Han Sans Neo",
  },
}));

// 홈 페이지
const Home = () => {
  const classes = useStyles();

  // 마이페이지 이동 핸들러
  const onMoveMyPage = () => {
    window.location.replace("/mypage");
  };

  // 로그아웃 핸들러
  const onLogOut = () => {
    sessionStorage.clear();
    window.location.replace("/");
  };

  return (
    // <div>
    //   <div className="home-title">
    //     <h1>토닥토닥</h1>
    //     <hr />
    //   </div>
    //   <div className="community-container">
    //     <Community />
    //   </div>
    //   <div>
    //     <ChatList />
    //   </div>
    // </div>
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <div></div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.paperHeader}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <div className={classes.paperHeaderInside}>
                  <button className={classes.linkBtn} onClick={onMoveMyPage}>
                    마이 페이지
                  </button>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className={classes.paperHeaderInsideTitle}>토닥토닥</div>
              </Grid>
              <Grid item xs={2}>
                <div className={classes.paperHeaderInside}>
                  <button className={classes.linkBtn} onClick={onLogOut}>
                    로그아웃
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div></div>
        </Grid>
        <Grid item xs={3}>
          <div></div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.vote}>우리동네 투표</div>
        </Grid>
        <Grid item xs={3}>
          <div></div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.surrounding}>주변 토닥터, 우리동네</div>
        </Grid>
        <Grid item xs={6}>
          <Community />
        </Grid>
        <Grid item xs={3}>
          <div className={classes.chatting}>
            <ChatList />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
