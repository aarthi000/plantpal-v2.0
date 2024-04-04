// App.js
import React, { useState } from 'react';
import Forum from './components/Forum'; // Importing the Forum component
import MessageForm from './components/MessageForm'; // Importing the MessageForm component

function App() {
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="App">
      <h1>PlantPal Forum</h1>
      <MessageForm onAddMessage={handleAddMessage} />
      <Forum messages={messages} />
    </div>
  );
}

export default App;
