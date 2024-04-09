import React, { useState } from 'react';
import {Advice} from "../pages/Advice";
import {Journal} from "../pages/Journal";
import Forum from '../components/Forum';
import MessageForm from '../components/MessageForm';
import '../App.css'; // Importing the CSS file

import { useNavigate } from "react-router-dom";

function Forum_page() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    const handleAddMessage = (message) => {
      setMessages([...messages, message]);
    };
  
    function clickAdvice() {
        navigate("/advice")
    }

    function clickJournal() {
        navigate("/journal")
    }
    
    return (
        <div className="App">
            <div className='Profile' id='leftColumn'>
              Profile
           </div>
            <div className="center-content" id='middleColumn'>
              <MessageForm onAddMessage={handleAddMessage} />
              <Forum messages={messages} />
            </div>
           
            <header className="App-header">
                <div className="btn-group">
                    <button className="role-button" onClick={clickAdvice}>Advice</button>
                    <button className="role-button" onClick={clickJournal}>Journal</button>
                </div>
            </header>
        </div>        
    )
}

export default Forum_page;
