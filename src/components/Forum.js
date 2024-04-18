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
            {/* User Name and Timestamp */}
            <div className="message-header">
              <div className="user-avatar"></div> {/* Placeholder for user avatar */}
              <div className="user-info">
                <p className="user-name">John Doe</p> {/* Replace with actual user name */}
                <p className="timestamp">10 minutes ago</p> {/* Replace with actual timestamp */}
              </div>
            </div>
            {/* Message Content */}
            <div className="message-content">
              <p>{message}</p> {/* Message text */}
            </div>
            {/* End of Message */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;
