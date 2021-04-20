import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import swal from "sweetalert";
import { Paper } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      flexGrow: 1,
      background: "#f8f8f8",
    },
  },
  head: {
    height: "25vh",
  },
  logo: {
    marginTop: "4vh",
    marginBottom: "1.5vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  slogan: {
    marginLeft: "1vw",
    fontSize: "2.5vh",
    weight: "bold",
    color: "darkgrey",
    fontFamily: "Spoqa Han Sans Neo",
  },
  signUp: {
    width: "35vw",
    position: "absolute",
    zIndex: "1",
    background: "white",
    boxShadow: "0px 0px 5px lightgrey",
    borderRadius: "1.8rem",
    padding: theme.spacing(5.75),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  signUpTitle: {
    color: "black",
    fontSize: "1.6vw",
    fontFamily: "Spoqa Han Sans Neo",
    marginBottom: "2.2vh",
  },
  textField: {
    width: "25vw",
    margin: "0.5vw",
    fontFamily: "Spoqa Han Sans Neo",
    borderRadius: 0,
  },
  buttonRegister: {
    width: "10vw",
    margin: "1vw",
    fontFamily: "Spoqa Han Sans Neo",
    fontWeight: "bold",
    color: "#ff8a4e",
    background: "white",
    border: "2px solid #ff8a4e",
    borderRadius: "0.8rem",
    boxShadow: "none",
    "&:hover": {
      background: "#ff8a4e",
      color: "white",
      boxShadow: "none",
    },
  },
}));

// 회원가입 페이지
function SignUp() {
  const url = `${window.location.origin}:5000`;
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwWarning, setPwWarning] = useState(<></>);

  // (회원가입 폼) 입력 핸들러
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordCheck") {
      setPasswordCheck(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  // (비밀번호 재확인 입력 시) 비밀번호 일치 확인
  useEffect(() => {
    if (password !== "" || passwordCheck !== "") {
      if (password !== passwordCheck) {
        setPwWarning(<p>비밀번호가 일치하지 않습니다.</p>);
      } else {
        setPwWarning(<></>);
      }
    }
  }, [passwordCheck]);

  // 회원가입 버튼 핸들러
  const onSignUpHandler = async (event) => {
    event.preventDefault();
    if (password === passwordCheck) {
      await axios
        .post(url + "/sign-up", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            nickname: nickname,
          }),
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 300) {
            swal({
              title: "회원가입 성공!",
              icon: "success",
            });
            history.push({
              pathname: "/profile",
              state: {
                email: email,
              },
            });
          } else if (response.data.status === 301) {
            swal({
              title: "회원가입 실패",
              text: "필수 입력 사항이 모두 입력되지 않았습니다.",
              icon: "warning",
            });
          } else if (response.data.status === 302) {
            swal({
              title: "회원가입 실패",
              text: "이미 등록된 이메일 주소입니다.",
              icon: "warning",
            });
          } else if (response.data.status === 303) {
            swal({
              title: "회원가입 실패",
              text: "이미 등록된 별명입니다.",
              icon: "warning",
            });
          } else if (response.data.status === 304) {
            swal({
              title: "회원가입 실패",
              text:
                "비밀번호 기준에 맞지 않습니다. 비밀번호는 8자이상, 숫자+영어+특수문자 조합으로 이루어집니다.",
              icon: "warning",
            });
          } else if (response.data.status === 305) {
            swal({
              title: "회원가입 실패",
              text: "비밀번호는 하나이상의 특수문자가 들어가야합니다.",
              icon: "warning",
            });
          } else {
            alert("error");
          }
        })
        .catch((error) => {
          alert("error");
        });
    }
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Row item xs={12} className={classes.head}></Row>
        <Row item xs={12} style={{ height: "55vh" }}>
          <Col item xs={2}></Col>
          <Col item xs={3}>
            <img
              className={classes.logo}
              src="./images/todak_logo.png"
              width="100%"
              alt="Todak Logo"
            />
            <p className={classes.slogan}>
              토닥토닥에서 우리 동네에 나와 같은 아픔을 가진 사람들과 따뜻한
              이야기를 나눠보세요.
            </p>
          </Col>
          <Col item xs={1}></Col>
          <Col item xs={4}>
            <Paper className={classes.signUp}>
              <h1 className={classes.signUpTitle}>로그인</h1>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                label="이메일을 입력해주세요"
                variant="outlined"
                name="email"
                type="email"
                value={email}
                onChange={onChangeHandler}
                required
              />
              <TextField
                className={classes.textField}
                id="outlined-basic"
                label="비밀번호는 8자이상, 숫자+영어+특수문자 조합"
                variant="outlined"
                name="password"
                type="password"
                value={password}
                onChange={onChangeHandler}
                required
              />
              <TextField
                className={classes.textField}
                id="outlined-basic"
                label="비밀번호 확인"
                variant="outlined"
                name="passwordCheck"
                type="password"
                value={passwordCheck}
                onChange={onChangeHandler}
                required
              />
              <TextField
                className={classes.textField}
                id="outlined-basic"
                label="이름을 입력해주세요"
                variant="outlined"
                name="name"
                type="text"
                value={name}
                onChange={onChangeHandler}
                required
              />
              <TextField
                className={classes.textField}
                id="outlined-basic"
                label="닉네임을 입력해주세요"
                variant="outlined"
                name="nickname"
                type="text"
                value={nickname}
                onChange={onChangeHandler}
                required
              />
              <Button
                className={classes.buttonRegister}
                variant="contained"
                size="large"
                onClick={onSignUpHandler}
              >
                회원 가입하기
              </Button>
            </Paper>
          </Col>
          <Col item xs={2}></Col>
        </Row>
        <Row>
          <div></div>
        </Row>
        <Row>
          <img src="./images/grass.png" width="100%" alt="Todak Logo" />
        </Row>
      </Grid>
    </div>
  );
}

export default SignUp;
