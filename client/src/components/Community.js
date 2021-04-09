import React, { useState, useEffect } from 'react';
import Posting from 'components/Posting';
import 'components/css/Community.css';

// 커뮤니티 컴포넌트
const Community = () => {
  const [text, setText] = useState(''); // 게시글
  const [newPosting, setNewPosting] = useState(''); // 새로운 게시글
  // 게시글 배열
  const [postings, setPostings] = useState([
    {
      // postId: 1,
      // ownerId: 10,
      text: 'hello',
    },
    {
      // postId: 2,
      // ownerId: 20,
      text: 'good',
    },
    {
      // postId: 3,
      // ownerId: 30,
      text: 'great',
    },
  ]);

  // 게시글 주기적으로 불러오기
  useEffect(() => {}, [postings]);

  // 게시글 작성 핸들러
  const onPosting = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
    console.log(text);
  };

  // 글 올리기 핸들러 ('글 올리기'버튼 클릭 시 호출)
  const onSubmit = async (event) => {
    event.preventDefault();
    setNewPosting(text);
    // axios 통신 (포스트 -> DB)
  };

  return (
    <div className="community-container">
      <h2>커뮤니티 포스팅</h2>
      {/* 게식글 생성 컴포넌트 */}
      <div className="create-post-container">
        <form>
          <input
            type="text"
            value={text}
            onChange={onPosting}
            placeholder="내용을 입력하세요."
            maxLength={120}
          />
          <button onClick={onSubmit}>글 올리기</button>
        </form>
      </div>
      <div className="posts-container">
        {/* 새로 등록한 게시글 */}
        <div className="latest-post-container">
          {newPosting == '' ? <></> : <Posting text={newPosting} />}{' '}
        </div>
        {/* DB에 저장되어 있는 게시글들 */}
        <div className="posts-array-container">DB에서 글 받아서 map으로 띄우기</div>
      </div>
    </div>
  );
};

export default Community;
