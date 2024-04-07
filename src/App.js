// App.js
import React, { useState } from 'react';
import { BrowserRouter as Routers, Route, Routes, Redirect } from "react-router-dom";
// import { Routes_ } from './Routes';
import Advice from './pages/Advice';
import Forum_page from "./pages/Forum_page";
import {Journal} from "./pages/Journal";
import Forum from './components/Forum';
import MessageForm from './components/MessageForm';
import './App.css'; // Importing the CSS file

function App() {
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    
      <div className='Navigation' id='rightColumn'>
        <Routers>
          <Routes>
            <Route exact path="/" element={<Forum_page/>} />
            <Route exact path="/advice" element={<Advice/>} />
            <Route exact path="/journal" element={<Journal/>} />
          </Routes>
        </Routers>
      </div>

    
  );
}

export default App;
