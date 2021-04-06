import React, { useState, useEffect } from 'react';
import Post from 'components/Post';

const Community = () => {
  const [text, setText] = useState(''); // 게시글
  const [posts, setPosts] = useState([
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
  ]); // 게시글 배열

  // 게시글 주기적으로 불러오기
  useEffect(() => {}, [posts]);

  // 게시글 작성 핸들러
  const onPostHandler = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
    console.log(text);
  };

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   // axios 통신 (포스트 -> DB)
  //   posts.push(post);
  //   console.log(posts);
  // };

  const PostArray = (posts) => {
    {
      posts.map((post) => <Post text={post.text} />);
    }
  };

  // 포스트 생성 컴포넌트
  const CreatePost = ({ text, onChange }) => {
    return (
      <div>
        <form>
          <input
            type="text"
            value={text}
            onChange={onChange}
            placeholder="내용을 입력하세요."
            maxLength={120}
          />
          <button>글 올리기</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h2>커뮤니티</h2>
      <div>
        <form>
          <input
            type="text"
            value={text}
            onChange={onPostHandler}
            placeholder="내용을 입력하세요."
            maxLength={120}
          />
          <button>글 올리기</button>
        </form>
      </div>
      <div>{/* <PostArray posts={posts} /> */}</div>
    </div>
  );
};

export default Community;
