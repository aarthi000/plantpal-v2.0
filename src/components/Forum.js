// Forum.js
import React from 'react';

function Forum({ messages }) {
  return (
    <div className="forum">
      <h2>Forum</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Forum;
