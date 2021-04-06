import React, { useState, useEffect } from 'react';
import Post from 'components/Post';

const Community = () => {
  const [post, setPost] = useState(''); // 게시글
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
    setPost(value);
    console.log(post);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // axios 통신 (포스트 -> DB)
    posts.push(post);
    console.log(posts);
  };

  const PostArray = (posts) => {
    {
      posts.map((post) => <Post text={post.text} />);
    }
  };

  const CreatePost = ({ onChange }) => {
    return (
      <div>
        <form>
          <input
            type="text"
            value={post}
            onChange={onChange}
            placeholder="내용을 입력하세요."
            maxLength={120}
          />
          <button onClick={onSubmit}>글 올리기</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h2>커뮤니티</h2>
      <CreatePost onChange={onPostHandler} />
      <div>{/* <PostArray posts={posts} /> */}</div>
    </div>
  );
};

export default Community;
