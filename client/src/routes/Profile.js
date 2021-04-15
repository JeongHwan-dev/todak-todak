import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "fBase";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { CancelScheduleSendSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      flexGrow: 1,
      background: "#f1f3f5",
    },
  },

  paper: {
    padding: theme.spacing(12),
    textAlign: "center",
  },

  insidePaperHeader: {
    height: theme.spacing(12),
    // padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    textAlign: "center",
  },

  insidePaper: {
    // height: theme.spacing(11),
    padding: theme.spacing(2),
    textAlign: "center",
  },

  paperBody: {
    height: 350,
    padding: theme.spacing(2),
  },

  paperLogo: {
    marginBottom: "3vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  paperSlogan: {
    fontSize: "1.5vw",
    fontFamily: "Spoqa Han Sans Neo",
  },

  profileForm: {
    width: "35vw",
    position: "absolute",
    zIndex: "1",
    background: "white",
    boxShadow: "0px 2px 10px lightgray",
    borderRadius: "1.8rem",
    padding: theme.spacing(5.75),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  paperFooter: {
    zIndex: "-1",
    marginTop: "10vh",
    padding: theme.spacing(0),
    background: "#f1f3f5",
  },

  paperProfile: {
    padding: theme.spacing(5),
    textAlign: "center",
  },

  paperIntro: {
    padding: "1vw",
    width: "15vw",
    height: "10vh",
    border: "1px solid lightgray",
    borderRadius: "0.5rem",
  },

  uploadProfile: {
    paddingLeft: theme.spacing(5),
    marginBottom: "1vh",
  },

  uploadProfileImg: {
    width: "12vw",
    height: "112vh",
    color: "white",
    background: "lightgray",
    padding: "25px",
    marginRight: "4vw",
    border: "1px solid lightgray",
    textAlign: "center",
  },

  prevImg: {
    width: "6vw",
    height: "11.5vh",
    // padding: "25px",
    border: "1px solid lightgray",
    borderRadius: "5rem",
    // textAlign: "center",
  },

  prevProfileImg: {
    width: "5.5vw",
    height: "11vh",
    // color: "white",
    // background: "lightgray",
    padding: "25px",
    marginRight: "4vw",
    border: "1px solid lightgray",
    borderRadius: "5rem",
    textAlign: "center",
  },

  profileTitle: {
    color: "black",
    fontSize: "1.6vw",
    fontFamily: "Spoqa Han Sans Neo",
    marginBottom: "2.2vh",
  },

  TextField: {
    width: "25vw",
    margin: "0.5vw",
    fontFamily: "Spoqa Han Sans Neo",
  },

  interest: {
    fontFamily: "Spoqa Han Sans Neo",
    float: "left",
    color: "dark",
    marginLeft: "1.5vw",
    fontWeight: "bold",
  },

  location: {
    fontFamily: "Spoqa Han Sans Neo",
    float: "left",
    marginLeft: "1.5vw",
    fontWeight: "bold",
  },

  certification: {
    fontFamily: "Spoqa Han Sans Neo",
    float: "left",
    marginLeft: "1.5vw",
    fontWeight: "bold",
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

  input: {
    display: "none",
  },

  profileImg: {
    width: "7vw",
    height: "14vh",
    borderRadius: "5rem",
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  formControl: {
    marginLeft: theme.spacing(4),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },

  subtitle: {
    textAlign: "left",
    width: "6vw",
    fontSize: "0.9vw",
    fontFamily: "Spoqa Han Sans Neo",
    marginTop: "2vh",
    marginBottom: "2vh",
    marginLeft: "1.5vw",
    marginRight: "3vw",
  },

  sub: {
    display: "flex",
  },

  subInput: {
    paddingTop: "0.1vh",
    paddingBottom: "0.1vh",
    marginTop: "2vh",
    marginBottom: "2vh",
    lineHeight: "1.5",
    color: "#495057",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    borderRadius: "0.5rem",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  },

  userData: {
    marginLeft: "5vw",
    // paddingLeft: "3.5vw",
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
  const url = 'http://elice-kdt-ai-track-vm-da-09.koreacentral.cloudapp.azure.com:5000';
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [profilePhoto, setProfilePhoto] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [userDiseases, setUserDiseases] = useState([]);
  const [doctorPdf, setDoctorPdf] = useState("");
  const [userLocation, setUserLocation] = useState("서울"); // 임시 샘플
  const [age, setAge] = useState("");
  const diseases = ["고혈압", "우울증", "탈모", "아토피", "당뇨", "비만"];

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
      console.log(introduction);
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

    let profilePhotoUrl = "";
    let doctorPdfUrl = "";

    if (profilePhoto !== "") {
      const profilePhotoRef = storageService
        .ref()
        .child(`${location.state.email}/${uuidv4()}`);
      const response = await profilePhotoRef.putString(
        profilePhoto,
        "data_url"
      );
      profilePhotoUrl = await response.ref.getDownloadURL();
    }

    if (doctorPdf !== "") {
      const doctorPdfRef = storageService
        .ref()
        .child(`${location.state.email}/${uuidv4()}`);
      const response = await doctorPdfRef.putString(doctorPdf, "data_url");
      doctorPdfUrl = await response.ref.getDownloadURL();
    }

    await axios.post(url + "/user-profile", {
      method: "POST",
      body: JSON.stringify({
        useremail: location.state.email,
        profilephotourl: profilePhotoUrl,
        userintroduction: introduction,
        userlocation: userLocation,
        userdiseases: userDiseases,
        userage: age,
        doctorpdfurl: doctorPdfUrl,
      }),
    });

    history.push({
      pathname: "/",
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.paper}></div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paperBody}></div>
        </Grid>
        <Grid item xs={3}>
          <Grid item xs={12}>
            <div className={classes.paperLogo}>
              <img
                src="./images/todak_logo.png"
                width="100%"
                alt="Todak Logo"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.paperSlogan}>
              토닥토닥에서 우리 동네에 나와 같은 아픔을 가진 사람들과 따뜻한
              이야기를 나눠보세요.
            </div>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <div className={classes.paperBody}></div>
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <div className={classes.profileForm}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <h2 className={classes.profileTitle}>프로필 작성</h2>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <div className={classes.uploadProfile}>
                    <Avatar src={profilePhoto} width="200px" height="200px" />
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      onChange={onFileChange}
                    />
                    {profilePhoto && (
                      <div>
                        <button onClick={onClearProfilePhoto}>지우기</button>
                      </div>
                    )}
                    {profilePhoto ? (
                      <></>
                    ) : (
                      <label htmlFor="icon-button-file">
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    )}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <textarea
                    className={classes.paperIntro}
                    name="userIntroduction"
                    cols="40"
                    rows="5"
                    placeholder="소개말을 입력해주세요."
                    onChange={onChangeHandler}
                  ></textarea>
                </Grid>
                <Grid item xs={1}></Grid>
                <div className={classes.userData}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <div className={classes.sub}>
                      <h5 className={classes.subtitle}>연령대</h5>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Age
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          onChange={onAgeChange}
                        >
                          <MenuItem value={"10"}>10대</MenuItem>
                          <MenuItem value={"20"}>20대</MenuItem>
                          <MenuItem value={"30"}>30대</MenuItem>
                          <MenuItem value={"40"}>40대</MenuItem>
                          <MenuItem value={"50"}>50대</MenuItem>
                          <MenuItem value={"60"}>60대</MenuItem>
                          <MenuItem value={"70"}>70대</MenuItem>
                          <MenuItem value={"80"}>80대</MenuItem>
                          <MenuItem value={"90"}>90대</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <div className={classes.sub}>
                      <h5 className={classes.subtitle}>관심질환</h5>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">
                          Chip
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
                    </div>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <div className={classes.sub}>
                      <h5 className={classes.subtitle}>우리동네</h5>
                      <input className={classes.subInput} type="text" />
                    </div>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <div className={classes.sub}>
                      <h5 className={classes.subtitle}>토닥터 인증</h5>
                      <input
                        id="doctor-validate-input"
                        className={classes.subInput}
                        type="file"
                        accept=".pdf"
                        onChange={onDoctorPdfChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </div>
                <Grid item xs={12}>
                  <Button
                    className={classes.ButtonRegister}
                    variant="contained"
                    size="large"
                    onClick={onSubmitProfile}
                  >
                    저장
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paperBody}></div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.paperFooter}>
            <img src="./images/grass.png" width="100%" alt="Todak Logo" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
