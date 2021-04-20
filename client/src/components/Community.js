import React, { useState, useEffect } from "react";
import Posting from "components/Posting";
import "components/css/Community.css";
import axios from "axios";
import { storageService } from "fBase";
import { v4 as uuidv4 } from "uuid";
import { Grid, Paper, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Row, Col } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  postingCreateBtn: {
    backgroundColor: "white",
    color: "#ff8a4e",
    "&:hover": {
      backgroundColor: "#ff8a4e",
      color: "white",
    },
  },
  postingDeleteBtn: {
    margin: theme.spacing(1),
    backgroundColor: "white",
    color: "gray",
    "&:hover": {
      backgroundColor: "gray",
      color: "white",
    },
  },
}));

// [커뮤니티] 컴포넌트
const Community = () => {
  const url = `${window.location.origin}:5000`;
  const classes = useStyles();
  const [posting, setPosting] = useState(""); // 게시글(내용)
  const [newPosting, setNewPosting] = useState(""); // 새로운 게시글
  const [postings, setPostings] = useState([]); // 게시글 배열
  const [currentPage, setCurrentPage] = useState(0);
  const [attachment, setAttachment] = useState("");

  // 새 게시글 작성 후 글 올리기하면 호출
  useEffect(() => {
    onReadPosting();
  }, [newPosting]);

  // [게시글] 작성 핸들러
  const onPosting = (event) => {
    const {
      target: { value },
    } = event;
    setPosting(value);
  };

  // [CREATE] 게시글 생성 핸들러 ('글 올리기'버튼 클릭 시 호출)
  const onCreatePosting = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${sessionStorage.userid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    await axios
      .post(url + "/article/post", {
        method: "POST",
        body: JSON.stringify({
          userid: sessionStorage.userid,
          nickname: sessionStorage.nickname,
          content: posting,
          attachmentUrl: attachmentUrl,
        }),
        withCredentials: true,
      })
      .then(() => {
        console.log("[CREATE] 새 게시글 생성");
        setNewPosting(posting);
      })
      .catch(() => {
        alert("[CREATE] response (x)");
      });

    setPosting("");
    setAttachment("");
  };

  // [READ] 게시글 DB에서 불러오기 핸들러
  const onReadPosting = async () => {
    await axios
      .post(url + "/article/read", {
        method: "POST",
        body: JSON.stringify({ currentPage: currentPage }),
      })
      .then((response) => {
        console.log("[READ] 게시글 목록 Reloading");
        response.data.reverse();
        setPostings(response.data);
      })
      .catch(() => {
        alert("[READ] response (x)");
      });
  };

  // [첨부파일] 업로드 핸들러
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
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // [첨부파일] Clear 핸들러
  const onClearAttachment = () => setAttachment(null);

  return (
    <Paper
    elevation={0}
    style={{ width: "100%", border: "none", backgroundColor: "#f8f8f8" }}
  >
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Paper
            style={{
              border: "1px solid lightgray ",
              marginBottom: "15px",
              borderRadius: "1rem",
              width: "100%",
              height: "100%",
            }}
          >
            <Grid item xs={12}>
              <Grid container spacing={0}>
                <Grid item xs={12}></Grid>
                <Grid
                  item
                  xs={12}
                  style={{ borderBottom: "1px solid lightgray" }}
                >
                  {/* 새글쓰기 타이틀 */}
                  <Row item xs={12}>
                    <Col item xs={11}>
                      <p
                        style={{
                          float: "left",
                          paddingTop: "12px",
                          paddingBottom: "5px",
                          paddingLeft: "20px",
                          margin: "0",
                        }}
                      >
                        새글쓰기
                      </p>
                    </Col>
                    <Col
                      item
                      xs={1}
                      style={{
                        float: "right",
                        paddingRight: "3rem",
                      }}
                    >
                      <IconButton
                        style={{
                          color: "#ff8a4e",
                        }}
                        aria-label="create"
                        onClick={onCreatePosting}
                      >
                        <Icon>send</Icon>
                      </IconButton>
                    </Col>
                  </Row>
                </Grid>
                <Grid item xs={12}>
                  {/* 새글쓰기 입력란 */}
                  <textarea
                    cols="40"
                    rows="5"
                    type="text"
                    value={posting}
                    onChange={onPosting}
                    placeholder="내용을 입력하세요."
                    maxLength={1000}
                    style={{
                      padding: "16px",
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  ></textarea>
                </Grid>
                <Grid item xs={12}>
                  <Row
                    item
                    xs={12}
                    style={{
                      margin: "0",
                      paddingBottom: "1rem",
                      paddingRight: "3rem",
                      float: "right",
                    }}
                  >
                    {/* 파일 첨부 */}
                    <div class="image-upload">
                      <label for="file-input">
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*"
                          onChange={onFileChange}
                          display="none"
                          style={{ visibility: "hidden" }}
                        />
                        <PhotoCameraIcon color="disabled" />
                      </label>
                    </div>
                    {/* 파일 첨부 이미지 미리보기 */}
                    {attachment && (
                      <>
                        <Row
                          item
                          xs={12}
                          style={{ margin: "0", width: "100%" }}
                        >
                          <img src={attachment} width="100%" height="100%" />
                        </Row>
                        <Row item xs={12} style={{ margin: "0" }}>
                          <IconButton
                            style={{
                              color: "gray",
                            }}
                            aria-label="delete"
                            onClick={onClearAttachment}
                          >
                            <Icon>delete</Icon>
                          </IconButton>
                        </Row>
                      </>
                    )}
                  </Row>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Grid item xs={12}>
            {/* 게시글 목록 */}
            {postings.map((posting) => (
              <Posting
                key={posting.postingid}
                postingObj={posting}
                content={posting.content}
                isOwner={posting.userid === sessionStorage.userid}
                onReadPosting={onReadPosting}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
  );
};

export default Community;
