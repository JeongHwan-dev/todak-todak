import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "fBase";
import InputAddress from "components/InputAddress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Row, Col } from "react-bootstrap";

import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      flexGrow: 1,
      background: "#f8f8f8",
    },
  },
  head: {
    height: "15vh",
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
  profile: {
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
  profileTitle: {
    color: "black",
    fontSize: "1.6vw",
    fontFamily: "Spoqa Han Sans Neo",
    marginBottom: "2.2vh",
  },
  ageInput: {
    width: "100%",
    paddingTop: "1px",
  },
  profileTitle: {
    color: "black",
    fontSize: "1.6vw",
    fontFamily: "Spoqa Han Sans Neo",
    marginBottom: "2.2vh",
  },
  ButtonRegister: {
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
  addressInput: {
    marginLeft: "1vw",
  },
  input: {
    display: "none",
    margin: "0 auto",
  },
  formControl: {
    width: "100%",
    height: "80%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  subMargin: {
    marginBottom: "2vh",
  },
  subInput: {
    width: "100%",
    lineHeight: "1.5",
    color: "#495057",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    borderRadius: "0.5rem",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(disease, userDisease, theme) {
  return {
    fontWeight:
      userDisease.indexOf(disease) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// 프로필 작성 컴포넌트
const Profile = () => {
  const url = `${window.location.origin}:5000`;
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [profilePhoto, setProfilePhoto] = useState("");
  const [doctorPdf, setDoctorPdf] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [userDiseases, setUserDiseases] = useState([]);
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const diseases = [
    "치매",
    "뇌졸증",
    "고혈압",
    "당뇨병",
    "간암",
    "폐암",
    "위암",
    "갑상선암",
    "대장암",
    "결핵",
    "지방간",
    "협심증",
    "심근경색",
    "비만",
    "빈혈",
    "디스크",
    "골다공증",
    "통풍",
    "오십견",
    "아토피",
    "탈모",
    "방광염",
    "불임",
    "백내장",
    "비염",
    "중이염",
    "우울증",
  ];

  // 프로필 사진 업로드 핸들러
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(files[0]);
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfilePhoto(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 의사 인증 pdf 파입 업로드 핸들러
  const onDoctorPdfChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(files[0]);
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setDoctorPdf(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 프로필 사진 Clear 핸들러
  const onClearProfilePhoto = () => setProfilePhoto(null);

  // 소개란 작성 핸들러
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "userIntroduction") {
      setIntroduction(value);
    }
  };

  // 연령대 선택 핸들러
  const onAgeChange = (event) => {
    setAge(event.target.value);
  };

  // 관심질병 선택 핸들러
  const handleChange = (event) => {
    setUserDiseases(event.target.value);
    console.log(userDiseases);
  };

  // 작성 프로필 저장 핸들러
  const onSubmitProfile = async (event) => {
    event.preventDefault();
    swal({
      title: "프로필 등록 성공!",
      text: "당신의 개인정보는 안전하게 보관됩니다.",
      icon: "success",
    });
    let profilePhotoUrl = "";
    let doctorPdfUrl = "";
    let userType = "";

    if (profilePhoto !== "") {
      const profilePhotoRef = storageService
        .ref()
        .child(`${location.state.email}/${uuidv4()}`);
      const response = await profilePhotoRef.putString(
        profilePhoto,
        "data_url"
      );
      profilePhotoUrl = await response.ref.getDownloadURL();
    } else {
      profilePhotoUrl = "./images/default_profile.png";
    }

    if (doctorPdf !== "") {
      const doctorPdfRef = storageService
        .ref()
        .child(`${location.state.email}/${uuidv4()}`);
      const response = await doctorPdfRef.putString(doctorPdf, "data_url");
      doctorPdfUrl = await response.ref.getDownloadURL();
      userType = await "토닥터";
    }
    console.log("address: " + address);

    await axios.post(url + "/user-profile", {
      method: "POST",
      body: JSON.stringify({
        useremail: location.state.email,
        profilephotourl: profilePhotoUrl,
        userintroduction: introduction,
        userlocation: address,
        userdiseases: userDiseases,
        userage: age,
        doctorpdfurl: doctorPdfUrl,
        usertype: userType,
      }),
    });

    history.push({
      pathname: "/",
    });
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
            <Paper className={classes.profile}>
              <h1 className={classes.profileTitle}>프로필 작성</h1>
              <br />
              <Row>
                <Col item xs={1}></Col>
                <Col item xs={3}>
                  <Avatar
                    src={profilePhoto}
                    style={{
                      height: "auto",
                      width: "100%",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={onFileChange}
                  />
                  {profilePhoto && (
                    <IconButton
                      aria-label="delete"
                      onClick={onClearProfilePhoto}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {profilePhoto ? (
                    <></>
                  ) : (
                    <label
                      htmlFor="icon-button-file"
                      style={{ margin: "0 auto" }}
                    >
                      <IconButton aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  )}
                </Col>
                <Col item xs={6} style={{ margin: "0 auto" }}>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={6}
                    placeholder="소개말을 입력해주세요."
                    variant="outlined"
                    onChange={onChangeHandler}
                    style={{ margin: "0 auto", width: "100%" }}
                  ></TextField>
                </Col>
                <Col item xs={1}></Col>
              </Row>
              <br />
              <Row className={classes.subMargin}>
                <Col item xs={2}></Col>
                <Col item xs={8}>
                  <TextField
                    className={classes.ageInput}
                    id="standard-number"
                    type="number"
                    label="나이를 입력해주세요."
                    onChange={onAgeChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Col>
                <Col item xs={2}></Col>
              </Row>
              <Row className={classes.subMargin}>
                <Col item xs={2}></Col>
                <Col item xs={8}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">
                      관심질환을 선택하세요.
                    </InputLabel>
                    <Select
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
                      multiple
                      value={userDiseases}
                      onChange={handleChange}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {diseases.map((disease) => (
                        <MenuItem
                          key={disease}
                          value={disease}
                          style={getStyles(disease, userDiseases, theme)}
                        >
                          {disease}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col item xs={2}></Col>
              </Row>
              <Row className={classes.subMargin}>
                <Col item xs={2}></Col>
                <Col item xs={8} className={classes.addressInput}>
                  <InputAddress address={address} setAddress={setAddress} />
                </Col>
                <Col item xs={2}></Col>
              </Row>
              <Row className={classes.subMargin}>
                <Col item xs={2}></Col>
                <Col item xs={8}>
                  <input
                    id="doctor-validate-input"
                    className={classes.subInput}
                    type="file"
                    accept=".pdf"
                    onChange={onDoctorPdfChange}
                  />
                </Col>
                <Col item xs={2}></Col>
              </Row>
              {/* 프로필 저장 버튼 */}
              <Button
                className={classes.ButtonRegister}
                variant="contained"
                size="large"
                onClick={onSubmitProfile}
              >
                저장
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
};

export default Profile;
