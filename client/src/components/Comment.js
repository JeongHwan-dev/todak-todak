import React, { useState } from "react";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ClearIcon from "@material-ui/icons/Clear";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import swal from "sweetalert";

// [댓글] 컴포넌트
const Comment = ({
  commentObj,
  content,
  isOwner,
  onReadComment,
  commentCount,
  setCommentCount,
}) => {
  const url = `${window.location.origin}:5000`;
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
    const ok = await swal("삭제하시겠습니까?", {
      buttons: ["Cancel", "OK"],
    });
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
          setCommentCount(commentCount - 1);
          onReadComment();
        })
        .catch(() => {
          alert("[DELETE] comment response (x)");
        });
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        style={{ width: "100%", marginTop: 5, marginBottom: 5 }}
      >
        <Grid item xs={12}>
          <Row>
            <Col item xs={3} style={{ fontWeight: "bold" }}>
              {/* [댓글] 작성자 프로필 사진 */}
              <img
                id="commentProfileImg"
                src={commentObj.profilephotourl}
                width="40vw"
                height="40vh"
                style={{ margin: 15, borderRadius: "20px" }}
              />
              {/* [댓글] 작성자 닉네임 */}
              {commentObj.nickname.replaceAll('"', "")}
              {/* 게시글 작성자가 의사일 경우 토닥터 뱃지 표기 */}
              {commentObj.usertype && (
                <LocalHospitalIcon style={{ marginLeft: 5, color: "green" }} />
              )}
            </Col>
            <Col item xs={5} style={{ margin: 0, paddingTop: 20 }}>
              {/* [댓글] 내용 */}
              {content}
            </Col>
            <Col item xs={1} style={{ margin: 0, paddingTop: 20 }}>
              {/* [댓글] 작성 날짜 */}
              {/* {commentObj.date} */}
            </Col>
            <Col item xs={2} style={{ paddingTop: 10 }}>
              {/* [댓글] 좋아요 버튼 */}
              <FormControlLabel
                style={{ margin: 0, paddingTop: 0 }}
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
              <span>{likeCount}</span>
            </Col>
            {/* [댓글] 작성자일 경우 삭제 버튼 표기 */}
            {isOwner ? (
              <Col
                item
                xs={1}
                style={{ margin: 0, paddingTop: 20, color: "lightgray" }}
              >
                {/* [댓글] 삭제 버튼 */}
                <ClearIcon onClick={onDeleteComment} />
              </Col>
            ) : (
              <Col item xs={1}></Col>
            )}
          </Row>
        </Grid>
      </Paper>
    </>
  );
};

export default Comment;
