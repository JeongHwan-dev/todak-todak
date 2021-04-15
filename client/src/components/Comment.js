import React, { useState } from "react";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import { Container, Col, Row, Card } from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// [댓글] 컴포넌트
const Comment = ({ commentObj, content, isOwner, onReadComment }) => {
  const url = `http://elice-kdt-ai-track-vm-da-09.koreacentral.cloudapp.azure.com:5000`;
  const [likeCount, setLikeCount] = useState(commentObj.likepeoplelength);
  const [likeState, setLikeState] = useState(
    Boolean(commentObj.likepeople.find(liked))
  );

  // [댓글] 이전에 사용자 댓글 좋아요 클릭 여부 확인
  function liked(element) {
    if (element === sessionStorage.userid) {
      return true;
    } else {
      return false;
    }
  }

  // [댓글] 좋아요 버튼 핸들러
  function onLikeHandle(event) {
    setLikeState(event.target.checked);
    if (event.target.checked === true) {
      onClickLike();
    } else {
      onCancelLike();
    }
  }

  // [CLICK] 좋아요 클릭 핸들러
  const onClickLike = async () => {
    setLikeCount(likeCount + 1);
    await axios
      .post(url + "/comment/like/click", {
        body: JSON.stringify({
          commentid: commentObj.commentid,
          likeuser: sessionStorage.userid,
        }),
      })
      .then(() => {
        console.log("[CLICK] Comment Like");
      })
      .catch(() => {
        alert("[CLICK] Comment Like Error");
      });
  };

  // [CANCEL] 댓글 좋아요 취소 핸들러
  const onCancelLike = async () => {
    if (likeCount >= 0) {
      setLikeCount(likeCount - 1);
    }
    await axios
      .post(url + "/comment/like/cancel", {
        body: JSON.stringify({
          commentid: commentObj.commentid,
          likeuser: sessionStorage.userid,
        }),
      })
      .then(() => {
        console.log("[CANCEL] Comment Like");
      })
      .catch(() => {
        alert("[CANCEL] Comment Like Error");
      });
  };

  // [DELETE] 댓글
  const onDeleteComment = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await axios
        .post(url + "/posting/comment/delete", {
          method: "POST",
          body: JSON.stringify({
            commentid: commentObj.commentid,
          }),
        })
        .then(() => {
          console.log("[DELETE] comment");
          onReadComment();
        })
        .catch(() => {
          alert("[DELETE] comment response (x)");
        });
    }
  };

  return (
    <>
      <Paper>
        <Grid item xs={12}>
          <Row>
            <Col>
              {/* [댓글] 작성자 프로필 사진 */}
              <img
                id="commentProfileImg"
                src={commentObj.profilephotourl}
                width="30px"
                height="30px"
              />
            </Col>
            <Col>
              {/* [댓글] 작성자 닉네임 */}
              {commentObj.nickname}
            </Col>
            <Col>
              {/* [댓글] 내용 */}
              {content}
            </Col>
            <Col>
              {/* [댓글] 작성 날짜 */}
              {commentObj.date}
            </Col>
            <Col>
              {/* [댓글] 좋아요 버튼 */}
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
              <p>{likeCount}</p>
            </Col>
            {/* [댓글] 작성자일 경우 삭제 버튼 표기 */}
            {isOwner && (
              <>
                <Col>
                  {/* [댓글] 삭제 버튼 */}
                  <button onClick={onDeleteComment}>X</button>
                </Col>
              </>
            )}
          </Row>
        </Grid>
      </Paper>
    </>
  );
};

export default Comment;
