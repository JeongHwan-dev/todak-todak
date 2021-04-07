import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/css/Posting.css';

// 포스트 카드 컴포넌트
const Posting = ({ postingObj, content }) => {
  const url = `http://localhost:5000`;

  // [DELETE] 게시글 삭제 핸들러
  const onDeletePosting = async ({ postingId }) => {
    const ok = window.confirm('삭제하시겠습니까?');
    console.log(ok);
    if (ok) {
      await axios
        .post(url + '/article/delete', {
          method: 'POST',
          body: JSON.stringify({
            postingId: postingId,
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

  return (
    <div className="posting-container">
      <h4>{content}</h4>
      <span>{postingObj.date}</span>
      <button onClick={onDeletePosting}>삭제</button>
      <button>수정</button>
    </div>
  );
};

export default Posting;
