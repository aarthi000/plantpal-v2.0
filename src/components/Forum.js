import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../App.css'; // Importing the CSS file with correct path
import { useAuth } from '../pages/login/contexts/AuthContext';

function Forum() {
  const { currentUser } = useAuth();

  // Initialize messages state with default messages
  const [messages, setMessages] = useState([
    {
      content: 'Hello, how are you?',
      timestamp: new Date().toISOString(),
    },
    {
      content: 'I am fine, thank you!',
      timestamp: new Date().toISOString(),
    },
  ]);

  // State for the new message content
  const [newMessageContent, setNewMessageContent] = useState('');

  // Function to add a new message
  const addMessage = () => {
    if (newMessageContent.trim() !== '') {
      const newMessage = {
        content: newMessageContent,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setNewMessageContent(''); // Clear the input field
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setNewMessageContent(e.target.value);
  };

  useEffect(() => {
    // Here you can fetch messages from an API or other data source
    // For this example, we'll use the default messages
  }, []);

  return (
    <div className="forum">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message-box">
            {/* User Name and Timestamp */}
            <div className="message-header">
              <div className="user-info">
                <p className="user-name">{currentUser.email}</p>
                <p className="timestamp">{formatTimestamp(message.timestamp)}</p>
              </div>
            </div>
            <div className="message-content"><p>{message.content}</p></div>
          </div>
        ))}
      </div>
      {/* Add message form */}
      <div className="add-message">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessageContent}
          onChange={handleInputChange}
        />
        <button onClick={addMessage}>Post</button>
      </div>
    </div>
  );
}

// Function to format timestamp
function formatTimestamp(timestamp) {
  return moment(timestamp).fromNow(); // Use moment library to format timestamp
}

export default Forum;
