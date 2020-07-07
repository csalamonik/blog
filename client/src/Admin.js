import React, { useState, useEffect } from 'react';


const Admin = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePostAdd = () => {
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Autorization: `Basic ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((r) => r.json())
      .then(console.warn);
  }

  return (
    <section>
      <ul>

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
