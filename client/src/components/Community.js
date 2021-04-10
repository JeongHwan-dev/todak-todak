import React, { useState, useEffect } from 'react';
import Posting from 'components/Posting';
import 'components/css/Community.css';
import axios from 'axios';
import { storageService } from 'fBase';
import { v4 as uuidv4 } from 'uuid';

// 커뮤니티 컴포넌트
const Community = () => {
  const url = `http://localhost:5000`;
  const [posting, setPosting] = useState(''); // 게시글(내용)
  const [newPosting, setNewPosting] = useState(''); // 새로운 게시글
  const [postings, setPostings] = useState([]); // 게시글 배열
  const [currentPage, setCurrentPage] = useState(0);
  const [attachment, setAttachment] = useState('');

  // 새 게시글 작성 후 글 올리기하면 호출
  useEffect(async () => {
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
    let attachmentUrl = '';

    if (attachment !== '') {
      const attachmentRef = storageService.ref().child(`${sessionStorage.userid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    console.log(attachmentUrl);
    await axios
      .post(url + '/article/post', {
        method: 'POST',
        body: JSON.stringify({
          userid: sessionStorage.userid,
          nickname: sessionStorage.nickname,
          usertype: '토닥이', // 추후 변경
          content: posting,
          attachmentUrl: attachmentUrl,
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

    setPosting(''); // 입력란 비우기
    setAttachment('');
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

  // 첨부파일 업로드 핸들러
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

  // 첨부파일 Clear 핸들러
  const onClearAttachment = () => setAttachment(null);

  return (
    <div id="community-container">
      <h2>우리동네 커뮤니티</h2>
      <div id="create-posting-container">
        <form>
          <input
            type="text"
            value={posting}
            onChange={onPosting}
            placeholder="내용을 입력하세요."
            maxLength={120}
          />
          <input id="attachment-input" type="file" accept="image/*" onChange={onFileChange} />
          {attachment && (
            <div>
              <img src={attachment} width="200px" height="150px" />
              <button onClick={onClearAttachment}>지우기</button>
            </div>
          )}
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
