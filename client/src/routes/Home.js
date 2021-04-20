import React, { useState, useEffect } from "react";
import Community from "components/Community";
import ChatList from "components/ChatList";
import LocalVisualization from 'routes/LocalVisualization';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LocalEvent from "routes/LocalEvent";
import { Col } from 'react-bootstrap';
import UserRelations from "routes/UserRelations";
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
  paperHeaderInside: {
    height: theme.spacing(4),
    padding: theme.spacing(1),
    fontWeight: "bold",
    color: "white",
    fontFamily: "Spoqa Han Sans Neo",
    textAlign: "center",
  },

  newPosting: {
    padding: theme.spacing(2),
    height: theme.spacing(28),
    textAlign: "center",
    borderRadius: "0.5rem",
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

  const url = `http://elice-kdt-ai-track-vm-da-09.koreacentral.cloudapp.azure.com:5000`;
  const [nickname, setNickname] = useState('홍길동');
  const [local, setLocal] = useState('서울특별시 강남구 역삼동');
  const [localPeople, setLocalPeople] = useState(0);

  async function getNickname() {
    const response = await axios.post(url + "/local",{
          method: "POST",
          body: JSON.stringify({
          userid: sessionStorage.userid,
          }),
          withCredentials: true,
          });
      setNickname(response.localPeople.data.nickname)
      setLocal(response.localPeople.data.local)
      setLocalPeople(response.localPeople.data.localPeople)
      console.log(response.data.local);
  }

  useEffect(() => {
    getNickname()
  },[])



  return (
    <>
    <Grid item xs={12} style={{ backgroundColor: "#f8f8f8"}}>
    {/* left margin space */}
    <Col item xs={1}><Container width="100%"></Container></Col>
    {/* content area */}
    <Col item xs={10} style={{ margin: "0 auto" }}>
      {/* header area */}
      <Row className={classes.paperHeader} style={{ marginBottom: "2rem" }}>
        <Col style={{ textAlign: "left", marginTop: "0.5rem" }}>
          <button className={classes.linkBtn} onClick={onMoveMyPage}>
          <a href="https://www.notion.so/15fc0219674545b88b3098b40b32b0f7" style={{ color: "inherit", textDecoration: 'none' }}>토닥토닥 알아보기</a>
          </button>
        </Col>
        <Col style={{ margin: "0 auto" }}>
          <button className={classes.linkBtnTitle} style={{ marginBottom: "0.2rem "}}>
            <img src="./images/todak_white.png" height="50px" />
          </button>
        </Col>
        <Col style={{ textAlign: "right",marginTop: "0.5rem"  }}>
          <button className={classes.linkBtn} onClick={onLogOut}>
            로그아웃
          </button>
        </Col>
      </Row>
      {/* body area */}
      <Row>
        {/* left side */}
        <Col item xs={2} spacing={2}>
        
          <Card style={{ width: "100%", border:"0 solid white"}}>
            <ChatList />
            <br/>
            <Button style={{ backgroundColor: "#ff8e4a", borderColor: "#ff8e4a" }} onClick={handleChangeUserRelations}>나의 네트워크 보기</Button>
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
          <img src="./images/b1.png" width="100%" />
          <div style={{ height: '1rem' }}></div>
          <img src="./images/b2.png" width="100%" />
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