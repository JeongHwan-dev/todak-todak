import React, { useState, useEffect } from "react";
import Community from "components/Community";
import ChatList from "components/ChatList";
import LocalVisualization from 'routes/LocalVisualization';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Col } from 'react-bootstrap';
import { Button, Row, Card } from "react-bootstrap";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperHeader: {
    height: theme.spacing(8),
    padding: theme.spacing(1),
    width: '70%',
    margin: "0 auto",
    textAlign: "center",
    borderRadius: "0rem 0rem 1rem 1rem",
    border: "1px solid lightgray",
    background: "#ff8a4e",
  },
  linkBtnTitle: {
    border: 0,
    outline: 0,
    background: "none",
    color: "white",
    fontSize: "1.5vw",
    fontWeight: "bold",
    fontFamily: "Spoqa Han Sans Neo",
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
  const history = useHistory();
  const classes = useStyles();
  const url = `${window.location.origin}:5000`;
  const [nickname, setNickname] = useState();
  const [local, setLocal] = useState();
  const [localPeople, setLocalPeople] = useState();

  // 홈으로 이동 핸들러
  const onMoveHome = () => {
    window.location.replace("/");
  };

  // 마이페이지 이동 핸들러
  const onMoveMyPage = () => {
    history.push("/user-relations");
  };
  
  // 로그아웃 핸들러
  const onLogOut = () => {
    sessionStorage.clear();
    window.location.replace("/");
  };

  const handelChangeHometown = (e) => {
    history.push('/hometown')
  }

  const handleChangeUserRelations = (e) => {
    history.push('/user-relations')
  }

  useEffect(() => {
    const response = axios.post(url + "/local",{
            method: "POST",
            body: JSON.stringify({
              userid: sessionStorage.userid,
            }),
            withCredentials: true,
          }).then((response) => {
    setNickname(response.data.nickname)
    setLocal(response.data.local)
    setLocalPeople(response.data.localPeople)
    console.log(localPeople)
  });
  },[]);


  return (
    <>
    <Grid item xs={12} style={{ backgroundColor: "#f8f8f8" }}>
    {/* left margin space */}
    <Col item xs={1}><Container width="100%"></Container></Col>
    {/* content area */}
    <Col item xs={10} style={{ margin: "0 auto" }}>
      {/* header area */}
      <Row className={classes.paperHeader} style={{ marginBottom: "2rem" }}>
        <Col style={{ textAlign: "left" }}>
          <button className={classes.linkBtn} onClick={onMoveMyPage}>
            마이 페이지
          </button>
        </Col>
        <Col style={{ margin: "0 auto" }}>
          <button className={classes.linkBtnTitle} onClick={onMoveHome}>
            <img src="./images/todak_white.png" height="50px" />
          </button>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <button className={classes.linkBtn} onClick={onLogOut}>
            로그아웃
          </button>
        </Col>
      </Row>
      {/* body area */}
      <Row>
        {/* left side */}
        <Col item xs={2} spacing={2}>
        <Row style={{ width: "100%", height: "30vh", margin: "0 auto" }}>
          <Card style={{ width: "100%" }}>
              안녕하세요 {nickname}님,<br/>
              {local}에서 {localPeople}명의 토닥러와 함께하고 있습니다.
            <Button style={{ backgroundColor: "#ff8e4a", borderColor: "#ff8e4a" }} onClick={handleChangeUserRelations}>더보기</Button>
          </Card>
          </Row>
          <br/>
          <Card style={{ width: "100%" }}>
            <ChatList />
          </Card>
          
        </Col>
        {/* middle area 본문 영역*/}
        <Col item xs={8} spacing={2}>
          <Community />
        </Col>
        {/* right side */}
        <Col item xs={2} spacing={2}>
          <Row style={{ width: "100%", height: "30vh", margin: "0 auto" }}>
            <Card style={{ width: "100%"}}>
              <LocalVisualization />
                <Button style={{ backgroundColor: "#ff8e4a", borderColor: "#ff8e4a" }} onClick={handelChangeHometown}>우리동네 정보보기</Button>
            </Card>
          </Row>
          <br/>
        </Col>
      </Row>
    </Col>
    {/* right margin space */}
    <Col item xs={1}><Container width="100%"></Container></Col>
    </Grid>
    </>
  );
};

export default Home;