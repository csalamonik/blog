import React, { useState, useEffect } from 'react';

const Admin = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((r) => setPosts(r.posts));
  }, [])

  const handlePostAdd = () => {
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((r) => r.json())
      .then(console.warn);
  }

  const handlePostDelete = (id) => {
    fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((r) => r.json())
      .then(console.warn);
  }

  return (
    <section>
      <ul>
        {posts.map((post) => (
          <li key={post._id} onClick={() => handlePostDelete(post._id)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
      </div>
      <button onClick={handlePostAdd}> Dodaj post</button>
    </section>
  );
};

export { Admin };
