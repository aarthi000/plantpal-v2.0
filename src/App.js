// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routers, Route, Routes, Redirect } from "react-router-dom";
// import { Routes_ } from './Routes';
import Advice from './pages/Advice';
import Forum_page from "./pages/Forum_page";
import {Journal} from "./pages/Journal";
import {Garden} from "./pages/Garden";
import Forum from './components/Forum';
import MessageForm from './components/MessageForm';
import './App.css'; // Importing the CSS file
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import Profile from "./pages/Profile";
import { Container } from 'react-bootstrap';
import { AuthProvider } from './pages/login/contexts/AuthContext';
import Map from './pages/Map';

function App() {
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
      <div style={{ minHeight: "100vh", width: "100%" }}>
        <div>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path='/' element={<Forum_page />}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/advice" element={<Advice />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/map" element={<Map />} />
                <Route path="/garden" element={<Garden />} />

                
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </div>

    
  );
}

export default App;
