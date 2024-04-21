import React, { useState } from 'react';
import moment from 'moment';
import '../App.css'; // Importing the CSS file with correct path

function Forum({ messages }) {
  const [avatars, setAvatars] = useState({});

  const handleAvatarChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatars({
        ...avatars,
        [index]: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
      // Remove the file input after uploading
      event.target.style.display = 'none';
    }
  };

  return (
    <div className="forum">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message-box">
            {/* User Name and Timestamp */}
            <div className="message-header">
              <div className="user-avatar">
                <label htmlFor={`avatar-input-${index}`} className="avatar-label">
                  <img 
                    src={avatars[index] || message.avatar} 
                    alt="Upload Post" 
                    className="avatar-image" 
                  />
                </label>
                <input 
                  type="file" 
                  id={`avatar-input-${index}`} 
                  accept="image/*" 
                  onChange={(event) => handleAvatarChange(event, index)} 
                  className="avatar-input" 
                />
              </div>
              <div className="user-info">
                <p className="user-name">{message.username}</p> {/* Replace with actual user name */}
                <p className="timestamp">{formatTimestamp(message.timestamp)}</p> {/* Replace with actual timestamp */}
              </div>
            </div>
            <div className="message-content"><p>{message.content}</p></div>
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
