import React, { useState, useEffect, useRef } from 'react';
import { Alert } from "react-bootstrap";
import { useAuth } from "./login/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Forum from '../components/Forum';
import MessageForm from '../components/MessageForm';

function Forum_page() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const forumRef = useRef(null);

    useEffect(() => {
        // Adjust the height of the forum container
        if (forumRef.current) {
            const forumHeight = forumRef.current.scrollHeight;
            forumRef.current.style.height = `${forumHeight}px` + 15;
        }
    }, [messages]);

    const handleAddMessage = (message) => {
        setMessages([...messages, message]);
    };

    const handleLogout = async () => {
        setError("");

        try {
            await logout();
            navigate("/login");
        } catch {
            setError("Failed to log out");
        }
    };

    const clickForum = () => {
        navigate("/");
    }

    const clickProfile = () => {
        navigate("/profile");
    };

    const clickAdvice = () => {
        navigate("/advice");
    };

    const clickJournal = () => {
        navigate("/journal");
    };

    const clickMap = () => {
        navigate("/map");
    };

    const clickGarden = () => {
        navigate("/garden");
    };

    return (
        <div className="w-full bg-[#151321] min-h-screen text-[#151321] flex flex-col gap-4 pb-12 font-rowdies">
            <div className='flex justify-between items-center align-center px-12 py-6'>
                <img src="./plantpallogo.png" alt="leaf" className="h-8"/>
                <div className>

                    <div className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold w-[100px] text-xs font-semibold">
                        <button onClick={handleLogout}>logout</button>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 justify-center items-center align-center">
                <div className='text-6xl justify-center items-center align-center'>
                ✨
                </div>
                <div className="bg-gradient-to-r from-teal-200 to-lime-200 inline-block text-transparent bg-clip-text text-center mb-4 font-bold text-6xl pt-12">PlantPal Forum</div>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className='text-6xl justify-center items-center align-center'>
                ✨
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex gap-12">
                <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickProfile}> My Profile</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickForum}>🌿 Forum</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickAdvice}>💭 Get Advice</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickJournal}>📝 My Journal</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickMap}>🌿 Find Plants</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickGarden}>📝 Garden Planner</button>

                </div>
            </div>

            <div className='bg-gradient-to-r from-teal-200 to-lime-200 shadow-sm p-2 m-8 rounded-lg'>
                <div className='text-[#151321] font-bold text-xl pt-2 pl-2'>
                    💬🌿 join the Green Chat...
                </div>
                <div className="bg-white center-content border-1 gap-48 rounded-lg p-12 " ref={forumRef}>
                    <MessageForm onAddMessage={handleAddMessage} />
                    <Forum messages={messages} />
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-[#151321] text-white text-center py-4">
                <div className="text-white text-center flex flex-col gap-2 opacity-50">
                    <div className="text-sm font-semibold">Contact Us</div>
                    <div className="text-xs">Have questions or feedback? Reach out to us at:</div>
                    <div className="text-xs">contact@plantpal.com</div>
                </div>
            </div>
        </div>
    );
}

export default Forum_page;
