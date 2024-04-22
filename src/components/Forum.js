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
    {
      content: 'Plants have a unique ability to perform photosynthesis, a process that captures sunlight to convert carbon dioxide and water into oxygen and glucose. This not only provides food for the plants themselves but also produces oxygen, which is crucial for the survival of most other living organisms on Earth, including humans.',
      timestamp: new Date().toISOString(),
    },
    {
      content: 'Many plants have medicinal properties and have been used in traditional and modern medicine for thousands of years. A large percentage of pharmaceuticals are derived from plant compounds. For example, the bark of the willow tree contains salicin, which is used to produce aspirin.',
      timestamp: new Date().toISOString(),
    },
    {
      content: 'From towering trees to tiny mosses, plants thrive in nearly every environment on Earth',
      timestamp: new Date().toISOString(),
    },
    {
      content: 'Plants are crucial for biodiversity, supporting various life forms by providing food and habitat.',
      timestamp: new Date().toISOString(),
    },
    {
      content: 'Through photosynthesis, plants absorb carbon dioxide, helping to mitigate climate change.',
      timestamp: new Date().toISOString(),
    },
    {
      content: 'Protecting plants is essential for maintaining biodiversity and ecological balance.',
      timestamp: new Date().toISOString(),
    },
    {
      content: 'Protecting plants is essential for maintaining biodiversity and ecological balance.',
      timestamp: new Date().toISOString(),
    },
    {
      content: 'Time heals all wounds. And if it doesnt, you name them something other than wounds and agree to let them stay. - Emma Forrest',
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
