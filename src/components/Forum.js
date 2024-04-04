// Forum.js
import React from 'react';
import '../App.css'; // Importing the CSS file with correct path

function Forum({ messages }) {
  return (
    <div className="forum">
      <h2>Forum</h2>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message-box">
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;
