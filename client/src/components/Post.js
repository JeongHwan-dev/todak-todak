import React from 'react';

// 포스트 카드 컴포넌트
const Post = ({ text }) => {
  // 포스트 삭제 함수 핸들러
  const onDeleteClick = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    console.log(ok);
    if (ok) {
      // delete post (axios)
    }
  };

  return (
    <div>
      <h4>{text}</h4>
      <button onClick={onDeleteClick}>Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default Post;
