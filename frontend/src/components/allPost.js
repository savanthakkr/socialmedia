import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const token = localStorage.getItem('accessToken');

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:5000/api/getPost', true);
      xhr.setRequestHeader('Authorization', token);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            setPosts(JSON.parse(xhr.responseText));
          } else {
            console.error('Error fetching products:', xhr.statusText);
          }
        }
      };
      xhr.send();
    };
    fetchPosts();
  }, []);

  const handleAddPost = () => {
    navigate('/addPost');
}
const handleAddComment = () => {
  navigate('/addComment');
}

  const handleLikeClick = (postId) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/api/addlike', true);
    xhr.setRequestHeader('Authorization', token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
            )
          );
        } else {
          console.error('Error adding like:', xhr.responseText);
        }
      }
    };
    xhr.send(JSON.stringify({ postId }));
  };

  const handleCommentClick = (postId) => {
    // Add your code here to handle comment submission
  };



  return (
    <div>
      <button className="btn btn-primary btn-sm mx-3" type="button" onClick={handleAddPost}>Add Post</button>
      <button className="btn btn-primary btn-sm mx-3" type="button" onClick={handleAddComment}>Add Comment</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.des}</h2>
          <p>Comments: {post.commentCount}</p>
          <p>Likes: {post.likeCount}</p>
          <button onClick={() => handleLikeClick(post.id)}>Like</button>
          <button onClick={() => handleCommentClick(post.id)}>Comment</button>
          <button className="Edit" type="button" onClick={() => navigate(`/addComment/${post.id}`)}>
          Add Comment
                            </button>
        </div>
        
      ))}
    </div>
  );
};

export default Posts;