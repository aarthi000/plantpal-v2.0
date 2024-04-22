// Forum.js
import React from 'react';
import moment from 'moment';
import '../App.css'; // Importing the CSS file with correct path
import { useAuth } from '../pages/login/contexts/AuthContext'

function Forum({ messages }) {

  const { currentUser } = useAuth();

  return (
    <div className="forum">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message-box">
            <div className="message-header">
              <div className="user-info">
                <p className="user-name">{currentUser.email}</p> 
                <p className="timestamp">{formatTimestamp(message.timestamp)}</p> 
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