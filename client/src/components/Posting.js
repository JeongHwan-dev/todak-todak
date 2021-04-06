import React from 'react';
import 'components/css/Posting.css';

// 포스트 카드 컴포넌트
const Posting = ({ text }) => {
  // 포스트 삭제 함수 핸들러
  const onDeleteClick = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    console.log(ok);
    if (ok) {
      // delete post (axios)
    }
  };

  return (
    <div className="posting-container">
      <h4>{text}</h4>
      <button onClick={onDeleteClick}>삭제</button>
      <button>수정</button>
    </div>
  );
};

export default Posting;
