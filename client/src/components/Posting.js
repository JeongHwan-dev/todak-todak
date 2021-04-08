import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import 'components/css/Posting.css';

// 포스트 카드 컴포넌트
const Posting = ({ postingObj, content, isOwner }) => {
  const url = `http://localhost:5000`;
  const [editing, setEditing] = useState(false);
  const [newPosting, setNewPosting] = useState(postingObj.content);

  // 수정 버튼 토글
  const toggleEditing = () => setEditing((prev) => !prev);

  // [UPDATE] 게시글 업데이트 핸들러
  const onUpdatePosting = async (event) => {
    event.preventDefault();
    await axios
      .post(url + '/article/update', {
        method: 'POST',
        body: JSON.stringify({
          postingId: postingObj.date,
          editContent: newPosting,
        }),
      })
      .then(() => {
        console.log('[UPDATE] 게시글 수정');
        window.location.replace('/community');
      })
      .catch(() => {
        alert('[UPDATE] response (x)');
      });
    setEditing(false);
  };

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
        .then(() => {
          console.log('[DELETE] 게시글 삭제');
          window.location.replace('/community');
        })
        .catch(() => {
          alert('[DELETE] response (x)');
        });
    }
  };

  // 게시글 수정 작성 핸들러
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPosting(value);
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form>
                <input
                  type="text"
                  placeholder="수정할 내용을 입력해주세요."
                  value={newPosting}
                  required
                  onChange={onChange}
                />
                <button onClick={onUpdatePosting}>완료</button>
              </form>
              <button onClick={toggleEditing}>취소</button>
            </>
          )}
        </>
      ) : (
        <>
          <div className="posting-container">
            <div className="posting-header-container">유저 타입: {postingObj.usertype}</div>
            <div className="posting-body-container">글 내용: {content}</div>
            <div className="posting-footer-container">
              <p>작성자: {postingObj.nickname}</p>
              <p>작성일: {postingObj.date}</p>
            </div>
            {isOwner && (
              <>
                <button onClick={onDeletePosting}>삭제</button>
                <button onClick={toggleEditing}>수정</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Posting;
