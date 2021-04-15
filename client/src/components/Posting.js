import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/css/Posting.css";
import { storageService } from "fBase";
import Comment from "components/Comment";
import { Grid, Paper } from "@material-ui/core";
import { Container, Col, Row, Card } from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// [게시글] 컴포넌트
const Posting = ({ postingObj, content, isOwner, onReadPosting }) => {
  const url = `http://elice-kdt-ai-track-vm-da-09.koreacentral.cloudapp.azure.com:5000`;
  const [editing, setEditing] = useState(false);
  const [newPosting, setNewPosting] = useState(postingObj.content);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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
  };

  // [DELETE] 게시글 삭제 핸들러
  const onDeletePosting = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
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
          usertype: "토닥이",
          content: comment,
        }),
        withCredentials: true,
      })
      .then(() => {
        console.log("[CREATE] 새 댓글 생성");
        setNewComment(comment);
      })
      .catch(() => {
        alert("[CREATE] response (x)");
      });
    setComment("");
  };

  // [READ] 댓글 삭제 핸들러
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
                style={{ border: "1px solid lightgray ", marginBottom: "15px" }}
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
                          padding: "16px",
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
            style={{ border: "1px solid lightgray ", marginBottom: "15px" }}
          >
            <Grid item xs={12}>
              <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
                <Col item xs={2}>
                  {/* 게시글 작성자 프로필 사진 */}
                  <img
                    id="profileImg"
                    src={postingObj.profilephotourl}
                    width="60px"
                    height="60px"
                  />
                </Col>
                <Col item xs={10}>
                  <Row>
                    {/* 게시글 작성자 닉네임 */}
                    <Col>{postingObj.nickname}</Col>
                    {/* 게시글 작성자가 의사일 경우 토닥터 뱃지 표기 */}
                    {postingObj.usertype && (
                      <>
                        <Col>{postingObj.usertype}</Col>
                      </>
                    )}
                  </Row>
                  <Row>
                    {/* 게시글 날짜 */}
                    <p>{postingObj.date}</p>
                  </Row>
                </Col>
              </Row>
              <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
                <Container>
                  {/* 게시글 내용 */}
                  <p>
                    글 내용: {content}
                    {/* 게시글 첨부파일 포함 시 이미지 출력 */}
                    {postingObj.attachmentUrl && (
                      <img
                        src={postingObj.attachmentUrl}
                        width="500px"
                        height="500px"
                      />
                    )}
                  </p>
                </Container>
              </Row>
              <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
                <Col item xs={2}>
                  <p>더보기</p>
                </Col>
                <Col item xs={6}></Col>
                <Col item xs={2}>
                  <p>댓글 수</p>
                </Col>
                <Col item xs={2}>
                  <Row>
                    <Col>
                      {/* 좋아요 */}
                      <FormControlLabel
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
                    </Col>
                    <Col>
                      {/* 좋아요 수 */}
                      <p>{likeCount}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
                <Card style={{ marginLeft: 20 }}>
                  {/* 댓글 목록 */}
                  {comments.map((comment) => (
                    <Comment
                      key={comment.commentid}
                      commentObj={comment}
                      content={comment.content}
                      isOwner={comment.userid === sessionStorage.userid}
                      onReadComment={onReadComment}
                    />
                  ))}
                </Card>
              </Row>
              <Row>
                <Col item xs={8}>
                  {/* 댓글 입력란 */}
                  <input
                    type="text"
                    value={comment}
                    onChange={onComment}
                    placeholder="댓글을 입력하세요."
                  />
                </Col>
                <Col item xs={4}>
                  {/* 댓글 등록 버튼 */}
                  <button onClick={onCreateComment}>댓글 입력</button>
                </Col>
              </Row>
              {isOwner && (
                <>
                  <Row>
                    <Col item xs={4}>
                      {/* 댓글 삭제 버튼 */}
                      <button onClick={onDeletePosting}>삭제</button>
                    </Col>
                    <Col item xs={4}>
                      {/* 댓글 수정 버튼 */}
                      <button onClick={toggleEditing}>수정</button>
                    </Col>
                  </Row>
                </>
              )}
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
};

export default Posting;
