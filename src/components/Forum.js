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
      imageUrl: null,
    },
    {
      content: 'I am fine, thank you!',
      timestamp: new Date().toISOString(),
      imageUrl: null,
    },
  ]);

  // State for the new message content and image
  const [newMessageContent, setNewMessageContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to add a new message
  const addMessage = () => {
    if (newMessageContent.trim() !== '') {
      const newMessage = {
        content: newMessageContent,
        timestamp: new Date().toISOString(),
        imageUrl: selectedImage,
      };
      setMessages([...messages, newMessage]);
      setNewMessageContent(''); // Clear the input field
      setSelectedImage(null); // Clear selected image
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setNewMessageContent(e.target.value);
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
  }, []);

  return (
    <div className="forum">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message-box">
            {/* User Name, Timestamp, and Image */}
            <div className="message-header">
              <div className="user-info">
                <p className="user-name">{currentUser.email}</p>
                <p className="timestamp">{formatTimestamp(message.timestamp)}</p>
              </div>
              {message.imageUrl && (
                <img src={message.imageUrl} alt="User uploaded" className="message-image" />
              )}
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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
