import React, { useState } from "react";
import axios from "axios";
import "components/css/Posting.css";
import { storageService } from "fBase";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { Container, Col, Row, Card } from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// 포스트 카드 컴포넌트
const Posting = ({ postingObj, content, isOwner, onReadPosting }) => {
  const url = `http://localhost:5000`;
  const [editing, setEditing] = useState(false);
  const [newPosting, setNewPosting] = useState(postingObj.content);
  const [likeState, setLikeState] = useState(
    Boolean(postingObj.likepeople.find(liked))
  );
  const [likeCount, setLikeCount] = useState(postingObj.likepeoplelength);

  // 사용자 좋아요 클릭 여부 확인
  function liked(element) {
    if (element === sessionStorage.userid) {
      return true;
    } else {
      return false;
    }
  }

  // 좋아요 클릭 핸들러
  const onClickLike = async (event) => {
    setLikeCount(likeCount + 1);
    await axios
      .post(url + "/posting/like/click", {
        method: "POST",
        body: JSON.stringify({
          postingId: postingObj.date,
          likeuser: sessionStorage.userid,
        }),
      })
      .then(() => {
        console.log("[Like] 좋아요 클릭 반영");
      })
      .catch(() => {
        alert("[Like] 좋아요 클릭 통신 에러");
      });
  };

  // 좋아요 취소 핸들러
  const onCancelLike = async (event) => {
    if (likeCount >= 0) {
      setLikeCount(likeCount - 1);
    }
    await axios
      .post(url + "/posting/like/cancel", {
        method: "POST",
        body: JSON.stringify({
          postingId: postingObj.date,
          likeuser: sessionStorage.userid,
        }),
      })
      .then(() => {
        console.log("[Like] 좋아요 취소 반영");
      })
      .catch(() => {
        alert("[Like] 좋아요 취소 통신 에러");
      });
  };

  // 수정 버튼 토글
  const toggleEditing = () => setEditing((prev) => !prev);

  // [UPDATE] 게시글 업데이트 핸들러
  const onUpdatePosting = async (event) => {
    event.preventDefault();
    await axios
      .post(url + "/article/update", {
        method: "POST",
        body: JSON.stringify({
          postingId: postingObj.date,
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
            postingId: postingObj.date,
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

  // 좋아요 핸들러
  const onLikeHandle = (event) => {
    setLikeState(event.target.checked);
    if (event.target.checked === true) {
      onClickLike();
    } else {
      onCancelLike();
    }
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
                    style={{ margin: 0, borderBottom: "1px solid lightgray " }}
                  >
                    <Container style={{ width: "100%", height: "16vh" }}>
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
                  <img
                    id="profileImg"
                    src={postingObj.profilephotourl}
                    width="60px"
                    height="60px"
                  />
                </Col>
                <Col item xs={10}>
                  <Row>
                    <p>{postingObj.nickname}</p>
                  </Row>
                  <Row>
                    <p>{postingObj.date}</p>
                  </Row>
                </Col>
              </Row>
              <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
                <Container>
                  <p>
                    글 내용: {content}
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
                  <p>{likeCount}</p>
                </Col>
              </Row>
              <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
                <Card style={{ marginLeft: 20 }}>
                  <p>댓글 공간</p>
                </Card>
              </Row>
              <Row>
                <Col item xs={8}>
                  <p>댓글 입력란</p>
                </Col>
                <Col item xs={4}>
                  <p>댓글추가 버튼</p>
                </Col>
              </Row>
              {isOwner && (
                <>
                  <Row>
                    <Col item xs={4}>
                      <button onClick={onDeletePosting}>삭제</button>
                    </Col>
                    <Col item xs={4}>
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
