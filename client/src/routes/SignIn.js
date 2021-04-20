import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Paper } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import swal from "sweetalert";

axios.defaults.withCredentials = true;

const signInStyles = makeStyles((theme) => ({
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
  signIn: {
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
  signInTitle: {
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
  buttonSignIn: {
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
  buttonSignUp: {
    width: "10vw",
    margin: "1vw",
    fontFamily: "Spoqa Han Sans Neo",
    fontWeight: "bold",
    color: "gray",
    background: "white",
    border: "2px solid gray",
    borderRadius: "0.8rem",
    boxShadow: "none",
    "&:hover": {
      background: "gray",
      color: "white",
      boxShadow: "none",
    },
  },
}));

// 로그인 페이지
function SignIn() {
  const url = `${window.location.origin}:5000`;
  const classes = signInStyles();
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });

  // (로그인 폼) 입력 핸들러
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "userEmail") {
      setUserEmail(value);
    } else if (name === "userPassword") {
      setUserPassword(value);
    }
  };

  // 로그인 핸들러
  const onSignInHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(url + "/", {
        method: "POST",
        body: JSON.stringify({
          userEmail: userEmail,
          userPassword: userPassword,
        }),
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 400) {
          swal({
            title: "로그인 성공!",
            text: "당신을 토닥 토닥",
            icon: "success",
            button: false,
          });
          sessionStorage.setItem("accessToken", response.data.access_token);
          sessionStorage.setItem("refreshToken", response.data.refresh_token);
          sessionStorage.setItem(
            "userid",
            JSON.stringify(response.data.user_object.id)
          );
          sessionStorage.setItem(
            "nickname",
            JSON.stringify(response.data.user_object.nickname)
          );
          sessionStorage.setItem(
            "email",
            JSON.stringify(response.data.user_object.email)
          );
          sessionStorage.setItem(
            "usertype",
            JSON.stringify(response.data.user_object.usertype)
          );
          window.location.replace("/");
        } else if (response.data.status === 401) {
          swal({
            title: "로그인 실패",
            text: "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.",
            icon: "error",
          });
        } else {
          alert("error");
        }
      })
      .catch(() => {
        alert("error for some reason");
      });
  };

  // 회원가입 페이지 이동 핸들러
  const onMoveSignUp = () => {
    history.push({
      pathname: "/sign-up",
    });
  };

  // 패스워드 입력 폼 관련 핸들러
  const handleChange = (prop) => (event) => {
    setUserPassword(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <Paper className={classes.signIn}>
              <h1 className={classes.signInTitle}>로그인</h1>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                label="이메일"
                variant="outlined"
                name="userEmail"
                type="email"
                value={userEmail}
                onChange={onChangeHandler}
                borderRadius={16}
              />
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  비밀번호
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <Button
                className={classes.buttonSignUp}
                variant="contained"
                size="large"
                onClick={onMoveSignUp}
              >
                회원가입
              </Button>
              <Button
                className={classes.buttonSignIn}
                variant="contained"
                size="large"
                onClick={onSignInHandler}
              >
                로그인
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

export default SignIn;
