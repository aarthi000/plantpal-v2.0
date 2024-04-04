// App.js
import React, { useState } from 'react';
import Forum from './components/Forum';
import MessageForm from './components/MessageForm';
import './App.css'; // Importing the CSS files

function App() {
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="App">
      <h1 className="title">PlantPal Forum</h1>
      <div className="content">
        <div className="center-content">
          <MessageForm onAddMessage={handleAddMessage} />
        </div>
        <div className="center-content">
          <Forum messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default App;
