import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "components/css/Posting.css";
import { storageService } from "fBase";
import Comment from "components/Comment";
import { Grid, Paper } from "@material-ui/core";
import { Container, Col, Row } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  commentInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #e5e5e5",
    borderRadius: "0.3rem",
    "&:focus, &:active": {
      width: "100%",
      border: "2px solid #d6d6d6",
      borderRadius: "0.3rem",
      outline: "none",
    },
  },
}));

// [게시글] 컴포넌트
const Posting = ({ postingObj, content, isOwner, onReadPosting }) => {
  const url = `${window.location.origin}:5000`;
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [newPosting, setNewPosting] = useState(postingObj.content);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentCount, setCommentCount] = useState(postingObj.commentCount);
  const [likeCount, setLikeCount] = useState(postingObj.likepeoplelength);
  const [likeState, setLikeState] = useState(
    Boolean(postingObj.likepeople.find(liked))
  );
  
  useEffect(() => {
    onReadComment();
  }, [newComment]);

  // [게시글] 사용자 게시글 좋아요 클릭 여부 확인
  function liked(element) {
    if (element === sessionStorage.userid) {
      return true;
    } else {
      return false;
    }
  }

  // [CLICK] 게시글 좋아요 클릭 핸들러
  const onClickLike = async (event) => {
    setLikeCount(likeCount + 1);
    await axios
      .post(url + "/posting/like/click", {
        method: "POST",
        body: JSON.stringify({
          postingid: postingObj.postingid,
          likeuser: sessionStorage.userid,
        }),
      })
      .then(() => {
        console.log("[CLICK] Posting Like");
      })
      .catch(() => {
        alert("[CLICK] Posting Like Error");
      });
  };

  // [CANCEL] 게시글 좋아요 취소 핸들러
  const onCancelLike = async (event) => {
    if (likeCount >= 0) {
      setLikeCount(likeCount - 1);
    }
    await axios
      .post(url + "/posting/like/cancel", {
        method: "POST",
        body: JSON.stringify({
          postingid: postingObj.postingid,
          likeuser: sessionStorage.userid,
        }),
      })
      .then(() => {
        console.log("[CANCEL] Posting Like");
      })
      .catch(() => {
        alert("[CANCEL] Posting Like Error");
      });
  };

  // [좋아요] 버튼 핸들러
  const onLikeHandle = (event) => {
    setLikeState(event.target.checked);
    if (event.target.checked === true) {
      onClickLike();
    } else {
      onCancelLike();
    }
  };

  // [게시글] 수정 버튼 토글
  const toggleEditing = () => setEditing((prev) => !prev);

  // [UPDATE] 게시글 업데이트 핸들러
  const onUpdatePosting = async (event) => {
    const ok = await swal("수정하시겠습니까?", {
      buttons: ["Cancel", "OK"],
    });
    if (ok) {
      event.preventDefault();
      await axios
        .post(url + "/article/update", {
          method: "POST",
          body: JSON.stringify({
            postingid: postingObj.postingid,
            editContent: newPosting,
          }),
        })
        .then(() => {
          console.log("[UPDATE] 게시글 수정");
          onReadPosting();
        })
        .catch(() => {
          alert("[UPDATE] response (x)");
        });
      setEditing(false);
    }
  };

  // [DELETE] 게시글 삭제 핸들러
  const onDeletePosting = async () => {
    const ok = await swal("삭제하시겠습니까?", {
      buttons: ["Cancel", "OK"],
    });
    if (ok) {
      await axios
        .post(url + "/article/delete", {
          method: "POST",
          body: JSON.stringify({
            postingid: postingObj.postingid,
          }),
        })
        .then(() => {
          console.log("[DELETE] 게시글 삭제");
          onReadPosting();
        })
        .catch(() => {
          alert("[DELETE] response (x)");
        });
      if (postingObj.attachmentUrl) {
        await storageService.refFromURL(postingObj.attachmentUrl).delete();
      }
    }
  };

  // 게시글 수정 작성 핸들러
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPosting(value);
  };

  // 댓글 작성 핸들러
  const onComment = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  // [CREATE] 댓글 생성 핸들러
  const onCreateComment = async (event) => {
    event.preventDefault();
    await axios
      .post(url + "/posting/comment/create", {
        method: "POST",
        body: JSON.stringify({
          postingid: postingObj.postingid,
          userid: sessionStorage.userid,
          nickname: sessionStorage.nickname,
          content: comment,
        }),
        withCredentials: true,
      })
      .then(() => {
        console.log("[CREATE] 새 댓글 생성");
        setCommentCount(commentCount + 1);
        setNewComment(comment);
      })
      .catch(() => {
        alert("[CREATE] response (x)");
      });
    setComment("");
  };

  // [READ] 댓글 읽기 핸들러
  const onReadComment = async () => {
    await axios
      .post(url + "/posting/comment/read", {
        method: "POST",
        body: JSON.stringify({
          postingid: postingObj.postingid,
        }),
      })
      .then((response) => {
        response.data.reverse();
        setComments(response.data);
      })
      .catch(() => {
        alert("[READ] comment response (x)");
      });
  };

  return (
    <>
      {editing ? (
        <>
          {isOwner && (
            <>
              <Paper
                style={{
                  border: "1px solid lightgray ",
                  marginBottom: "15px",
                  borderRadius: "1rem",
                }}
              >
                <Grid item xs={12}>
                  <Row
                    style={{
                      margin: 0,
                      borderBottom: "1px solid lightgray",
                    }}
                  >
                    <Container style={{ width: "100%", height: "16vh" }}>
                      {/* 게시글 수정 모드 시 입력란 */}
                      <textarea
                        cols="40"
                        rows="5"
                        type="text"
                        value={newPosting}
                        onChange={onChange}
                        placeholder="내용을 입력하세요."
                        maxLength={120}
                        style={{
                          padding: "20px",
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                      ></textarea>
                    </Container>
                  </Row>
                  <Row
                    style={{ margin: 0, borderBottom: "1px solid lightgray " }}
                  >
                    {/* 게시글 수정 모드 시 취소, 완료 버튼 */}
                    <button onClick={toggleEditing}>취소</button>
                    <button onClick={onUpdatePosting}>완료</button>
                  </Row>
                </Grid>
              </Paper>
            </>
          )}
        </>
      ) : (
        <>
          <Paper
            style={{
              border: "1px solid lightgray ",
              marginBottom: "15px",
              borderRadius: "1rem",
            }}
          >
            <Grid item xs={12}>
              <Row
                itme
                xs={12}
                style={{
                  margin: 0,
                  padding: 5,
                  borderBottom: "1px solid lightgray ",
                }}
              >
                <Col item xs={4} style={{ fontWeight: "bold", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                  {/* 게시글 작성자 프로필 사진 */}
                  <img
                    id="profileImg"
                    src={postingObj.profilephotourl}
                    width="60vw"
                    height="60vh"
                    style={{ marginTop: 5, marginBottom: 5, marginleft: 5, marginRight: 20 }}
                  />
                  <Link
                    style={{ color: "black" }}
                    to={{
                      pathname: "/chat",
                      state: { targetUser: postingObj.userid },
                    }}
                  >
                    {postingObj.nickname.replaceAll('"', "")}
                  </Link>
                  {postingObj.usertype && (
                    <>
                      <LocalHospitalIcon
                        style={{ marginLeft: 5, color: "green" }}
                      />
                    </>
                  )}
                </Col>
                <Col item xs={4}></Col>
                <Col
                  item
                  xs={2}
                  style={{
                    paddingTop: 15,
                    color: "lightgray",
                    fontSize: "1rem",
                  }}
                >
                  {postingObj.createdate}
                </Col>
                <Col item xs={2}>
                  {isOwner && (
                    <>
                      <Row>
                        <Col item xs={1}>
                          {/* 게시글 수정 버튼 */}
                          <IconButton
                            style={{
                              display: "flex",
                              color: "gray",
                            }}
                            aria-label="edit"
                            onClick={toggleEditing}
                          >
                            <Icon>edit</Icon>
                          </IconButton>
                        </Col>
                        <Col item xs={1}></Col>
                        <Col item xs={1}>
                          {/* 게시글 삭제 버튼 */}
                          <IconButton
                            style={{
                              display: "flex",
                              color: "gray",
                            }}
                            aria-label="delete"
                            onClick={onDeletePosting}
                          >
                            <Icon>delete</Icon>
                          </IconButton>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
              <Row itme xs={12} style={{ margin: 0 }}>
                <Container>
                  {/* 게시글 내용 */}
                  <Row style={{ padding: 20 }}>{content}</Row>
                  <br />
                  {/* 게시글 첨부파일 포함 시 이미지 출력 */}
                  {postingObj.attachmentUrl && (
                    <Row style={{ padding: 15 }}>
                      <img
                        src={postingObj.attachmentUrl}
                        width="500px"
                        height="500px"
                      />
                    </Row>
                  )}
                </Container>
              </Row>
              <Row item xs={12} style={{ margin: 0 }}>
                <Col item xs={8}></Col>
                <Col item xs={2} style={{ margin: 0, paddingTop: "8px" }}>
                  <span style={{ marginRight: 10}}><CommentIcon /></span><span>{commentCount}</span>
                </Col>
                <Col item xs={2} style={{margin: 0, padding: 0}}>
                  {/* 좋아요 */}
                  <FormControlLabel
                    style={{ margin: 0}}
                    control={
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        onChange={onLikeHandle}
                        checked={likeState}
                        name="likeState"
                      />
                    }
                  />
                  <span>                  
                  {/* 좋아요 수 */}
                  {likeCount}</span>
                </Col>
              </Row>
              <Row
                item
                xs={12}
                style={{
                  margin: 0,
                  borderTop: "1px solid lightgray ",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Container style={{ margin: 2 }}>
                  {/* 댓글 목록 */}
                  {comments.map((comment) => (
                    <Comment
                      key={comment.commentid}
                      commentObj={comment}
                      content={comment.content}
                      isOwner={comment.userid === sessionStorage.userid}
                      onReadComment={onReadComment}
                      commentCount={commentCount}
                      setCommentCount={setCommentCount}
                    />
                  ))}
                </Container>
              </Row>
              <Row
                item
                xs={12}
                style={{ marginTop: 5, marginBottom: "1.2rem" }}
              >
                <Col
                  item
                  xs={10}
                  style={{ marginLeft: "2rem", marginRight: "2rem" }}
                >
                  {/* 댓글 입력란 */}
                  <input
                    className={classes.commentInput}
                    type="text"
                    value={comment}
                    onChange={onComment}
                    placeholder="댓글 입력하기"
                  />
                </Col>
                <Col item xs={1}>
                  {/* 댓글 등록 버튼 */}
                  <IconButton
                    style={{
                      color: "#ff8a4e",
                    }}
                    aria-label="create"
                    onClick={onCreateComment}
                  >
                    <Icon>send</Icon>
                  </IconButton>
                </Col>
              </Row>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
};

export default Posting;
