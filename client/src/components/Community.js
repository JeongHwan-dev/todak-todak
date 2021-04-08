import React, { useState, useEffect } from 'react';
import Posting from 'components/Posting';
import 'components/css/Community.css';
import axios from 'axios';

// 커뮤니티 컴포넌트
const Community = () => {
  const url = `http://localhost:5000`;
  const [posting, setPosting] = useState(''); // 게시글(내용)
  const [newPosting, setNewPosting] = useState(''); // 새로운 게시글

  const [postings, setPostings] = useState([]); // 게시글 배열
  const [currentPage, setCurrentPage] = useState(0);

  // 새 게시글 작성 후 글 올리기하면 호출
  useEffect(() => {
    onReadPosting(); // 게시글 불러오기 호출
  }, [newPosting]);

  // 게시글 작성 핸들러
  const onPosting = (event) => {
    const {
      target: { value },
    } = event;
    setPosting(value);
  };

  // [CREATE] 게시글 생성 핸들러 ('글 올리기'버튼 클릭 시 호출)
  const onCreatePosting = async (event) => {
    event.preventDefault();
    setPosting(''); // 입력란 비우기
    await axios
      .post(url + '/article/post', {
        method: 'POST',
        body: JSON.stringify({
          userid: sessionStorage.userid,
          nickname: sessionStorage.nickname,
          usertype: '토닥이', // 추후 변경
          content: posting,
        }),
        withCredentials: true,
      })
      .then(() => {
        console.log('[CREATE] 새 게시글 생성');
        setNewPosting(posting);
      })
      .catch(() => {
        alert('[CREATE] response (x)');
      });
  };

  // [READ] 게시글 DB에서 불러오기 핸들러
  const onReadPosting = async () => {
    await axios
      .post(url + '/article/read', {
        method: 'POST',
        body: JSON.stringify({
          currentPage: currentPage,
        }),
      })
      .then((response) => {
        console.log('[READ] 게시글 목록 Reloading');
        response.data.reverse();
        setPostings(response.data);
      })
      .catch(() => {
        alert('[READ] response (x)');
      });
  };

  return (
    <div className="community-container">
      <h2>커뮤니티 포스팅</h2>
      <div className="create-posting-container">
        <form>
          <input
            type="text"
            value={posting}
            onChange={onPosting}
            placeholder="내용을 입력하세요."
            maxLength={120}
          />
          <button onClick={onCreatePosting}>글 올리기</button>
        </form>
      </div>
      <div className="postings-container">
        {postings.map((posting) => (
          <Posting
            key={posting.date}
            postingObj={posting}
            content={posting.content}
            isOwner={posting.userid === sessionStorage.userid}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
