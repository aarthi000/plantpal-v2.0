import React, { useState } from 'react';
import {Advice} from "../pages/Advice";
import {Journal} from "../pages/Journal";
import Forum from '../components/Forum';
import MessageForm from '../components/MessageForm';
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "./login/contexts/AuthContext"
import { Link } from "react-router-dom"

import '../App.css'; // Importing the CSS file

import { useNavigate } from "react-router-dom";
import { formatPrefix } from 'd3';

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

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()

    async function handleLogout() {
        setError("")

        try {
        await logout()
        navigate("/login")
        } catch {
        setError("Failed to log out")
        }
    }
    
    return (
        <div className="App">
            <div className="center-content" id='leftColumn'>
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="link" onClick={handleLogout}>Logout</Button>
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
        
        // <div class="container">
        //     <header className="App-header">
        //          <div className="btn-group">
        //             <button className="role-button" onClick={clickAdvice}>Advice</button>
        //             <button className="role-button" onClick={clickJournal}>Journal</button>
                    
        //          </div>
        //     </header>
        //     <div class="row">
        //         <div class="col">
        //             <div class="card">
        //                 <div class="card-body">
        //                     <h5 class="card-title">Profile</h5>
        //                     {error && <Alert variant="danger">{error}</Alert>}
        //                     {/* <strong>Email:</strong> {currentUser.email} */}
        //                     <Button variant="link" onClick={handleLogout}>Logout</Button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="col">
        //             <div class="card">
        //                 <div class="card-body">
        //                     <h5 class="card-title">PlantPal Forum</h5>
        //                     <MessageForm onAddMessage={handleAddMessage} />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Forum_page;
