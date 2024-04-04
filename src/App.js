// App.js
import React, { useState } from 'react';
import Forum from './components/Forum';
import MessageForm from './components/MessageForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link
import './App.css'; // Importing the CSS file
import Journal from './components/Journal';
import Advice from './components/Advice';

function App() {
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className='Profile' id='leftColumn'>
          Profile
        </div>
    
        <div className="center-content" id='middleColumn'>
          <MessageForm onAddMessage={handleAddMessage} />
          <Forum messages={messages} />
        </div>
          
        <div className='Navigation' id='rightColumn'>
          Navigation
          {/* Link to navigate to Journal */}
          <Link to="/journal">Go to Journal</Link>
          {/* You can also add a Link for Advice here */}
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/journal" element={<Journal />} />
          {/* Define more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
