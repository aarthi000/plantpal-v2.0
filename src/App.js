// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routers, Route, Routes, Redirect } from "react-router-dom";
// import { Routes_ } from './Routes';
import Advice from './pages/Advice';
import Forum_page from "./pages/Forum_page";
import {Journal} from "./pages/Journal";
import Forum from './components/Forum';
import MessageForm from './components/MessageForm';
import './App.css'; // Importing the CSS file
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import { Container } from 'react-bootstrap';
import { AuthProvider } from './pages/login/contexts/AuthContext';

function App() {
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Forum_page />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
  
  //     <div className='Navigation' id='rightColumn'>
  //       <Routers>
  //         <Routes>
  //           <Route exact path="/" element={<Forum_page/>} />
  //           <Route exact path="/advice" element={<Advice/>} />
  //           <Route exact path="/journal" element={<Journal/>} />
  //         </Routes>
  //       </Routers>
  //     </div>

    
  );
}

export default App;
