// App.js
import React, { useState } from 'react';
import Forum from './components/Forum';
import MessageForm from './components/MessageForm';
import './App.css'; // Importing the CSS file
import Journal from './components/Journal';
import Advice from './components/Advice';
import Profile from './components/Profile';

function App() {
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="App">
      
      <div className='Profile' id='leftColumn'>
        
        <Profile/>
      </div>
  
        <div className="center-content" id='middleColumn'>
          <MessageForm onAddMessage={handleAddMessage} />
          <Forum messages={messages} />
        </div>
        
    

      <div className='Navigation' id='rightColumn'>
        Navigation
        <Journal/>
        <Advice/>
      </div>
    </div>

    
  );
}

export default App;
