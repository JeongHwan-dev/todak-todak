import React, { useState, useEffect } from 'react';
import Posting from 'components/Posting';
import 'components/css/Community.css';
import axios from 'axios';

// 커뮤니티 컴포넌트
const Community = () => {
  const url = `http://localhost:5000`;
  const [posting, setPosting] = useState(''); // 게시글(내용)
  const [postingId, setPostingId] = useState(1);
  const [newContent, setNewContent] = useState(''); // 수정 게시글(내용)
  const [newPosting, setNewPosting] = useState({}); // 새로운 게시글
  // 게시글 배열
  const [postings, setPostings] = useState([]);
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
    setNewPosting({ content: posting, date: Date.now(), userid: sessionStorage.userToken });
    setPostingId(postingId);
    await axios
      .post(url + '/article/post', {
        method: 'POST',
        body: JSON.stringify({
          userid: sessionStorage.id,
          nickname: sessionStorage.nickname,
          content: posting,
        }),
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.status);
      })
      .catch((error) => {
        alert('[CREATE] response 없음');
      });
  };

  // [READ] 게시글 DB에서 불러오기 핸들러
  const onReadPosting = async (event) => {
    await axios
      .post(url + '/article/read', {
        method: 'POST',
        body: JSON.stringify({
          currentPage: currentPage,
        }),
      })
      .then((response) => {
        console.log(response.data);
        setPostings(response.data);
      })
      .catch((error) => {
        alert('[READ] response 없음');
      });
  };

  // [DELETE] 게시글 삭제 핸들러
  const onDeletePosting = async ({ event, postingId }) => {
    event.preventDefault();
    await axios
      .post(url + '/article/delete', {
        method: 'POST',
        body: JSON.stringify({
          postingId: postingId,
        }),
      })
      .then((response) => {
        console.log(response.data.status);
      })
      .catch((error) => {
        alert('[DELETE] response 없음');
      });
  };

  return (
    <div className="community-container">
      <h2>커뮤니티 포스팅</h2>
      {/* 게식글 생성 컴포넌트 */}
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
        {/* 새로 등록한 게시글 */}
        <div className="latest-posting-container">
          {newPosting === '' ? (
            <></>
          ) : (
            <Posting key="000" postingObj={newPosting} content={newPosting.content} />
          )}{' '}
        </div>
        {/* DB에 저장되어 있는 게시글들 */}
        <div className="postings-array-container">
          {postings.map((posting) => (
            <Posting key={posting.date} postingObj={posting} content={posting.content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
