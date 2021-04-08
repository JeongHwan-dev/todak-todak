import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/css/Posting.css';

// 포스트 카드 컴포넌트
const Posting = ({ postingObj, content }) => {
  const url = `http://localhost:5000`;

  // [DELETE] 게시글 삭제 핸들러
  const onDeletePosting = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    console.log(ok);
    if (ok) {
      await axios
        .post(url + '/article/delete', {
          method: 'POST',
          body: JSON.stringify({
            postingId: postingObj.date,
          }),
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert('[DELETE] response 없음');
        });
    }
  };

  // [UPDATE] 게시글 업데이트 핸들러
  const onUpdatePosting = async ({ postingId, editContent }) => {
    await axios
      .post(url + 'article/update', {
        method: 'POST',
        body: JSON.stringify({
          postingId: postingId,
          editContent: editContent,
        }),
      })
      .then((response) => {
        console.log(response.data.status);
      })
      .catch((error) => {
        alert('[UPDATE] response 없음');
      });
  };

  return (
    <div className="posting-container">
      <div className="posting-header-container">*{postingObj.usertype}*</div>
      <div className="posting-body-container">글 내용: {content}</div>
      <div className="posting-footer-container">
        <p>작성자: {postingObj.nickname}</p>
        <p>작성 날짜: {postingObj.date}</p>
      </div>
      <button onClick={onDeletePosting}>삭제</button>
      <button>수정</button>
    </div>
  );
};

export default Posting;
