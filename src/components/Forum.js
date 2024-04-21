// Forum.js
import React from 'react';
import moment from 'moment';
import '../App.css'; // Importing the CSS file with correct path

function Forum({ messages }) {
  return (
    <div className="forum">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message-box">
            {/* User Name and Timestamp */}
            <div className="message-header">
              <div className="user-avatar"></div> {/* Placeholder for user avatar */}
              <div className="user-info">
                <p className="user-name">John Doe</p> {/* Replace with actual user name */}
                <p className="timestamp">{formatTimestamp(message.timestamp)}</p> {/* Replace with actual timestamp */}
              </div>
            </div>
            <div className="message-content"><p>{message}</p></div>
          </div>


        ))}
      </div>
    </div>
  );
}

// Function to format timestamp
function formatTimestamp(timestamp) {
  return moment(timestamp).fromNow(); // Use moment library to format timestamp
}

export default Forum;
