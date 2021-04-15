import React, { useState, useEffect } from "react";
import Posting from "components/Posting";
import "components/css/Community.css";
import axios from "axios";
import { storageService } from "fBase";
import { v4 as uuidv4 } from "uuid";
import { Grid, Paper } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";

// [커뮤니티] 컴포넌트
const Community = () => {
  const url = `http://elice-kdt-ai-track-vm-da-09.koreacentral.cloudapp.azure.com:5000`;
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
          // usertype: "토닥이", // 추후 변경
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
    <Paper style={{ width: "100%", border: "none" }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Paper
              style={{ border: "1px solid lightgray ", marginBottom: "15px" }}
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
                    <p style={{ float: "left", padding: "10px", margin: "0" }}>
                      새글쓰기
                    </p>
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
                      maxLength={120}
                      style={{
                        padding: "16px",
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                    ></textarea>
                  </Grid>
                  <Grid item xs={12}>
                    <Row item xs={12} style={{ margin: "0" }}>
                      {/* 파일 첨부 */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "1px dotted lightgray",
                        }}
                      />
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
                            {/* 미리보기 이미지 지우기 버튼 */}
                            <button onClick={onClearAttachment}>지우기</button>
                          </Row>
                        </>
                      )}
                    </Row>
                  </Grid>
                  <Grid item xs={12}>
                    {/* 게시글 생성 버튼 */}
                    <button onClick={onCreatePosting}>글 올리기</button>
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
