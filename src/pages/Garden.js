import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar'; // Import your calendar component
import Planner from '../components/Planner';

export const Garden = () => {
    //delete me!
    const selectedDate = new Date('2024-04-01'); // Example date, replace with your desired date

    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch journal entries from database or local storage
        // Example:
        // const fetchedEntries = fetchJournalEntries();
        // setEntries(fetchedEntries);
    }, []);

    const clickAdvice = () => {
        navigate('/advice');
    };

    const clickForum = () => {
        navigate('/');
    };

    return (
        
        <div className="w-full bg-[#151321] min-h-screen text-[#151321] flex flex-col gap-4 pb-12">
            <div className='flex justify-between items-center align-center px-12 py-6'>
                <Link to="/Forum_page">
                  <img src="./plantpallogo.png" alt="leaf" className="h-8"/>
                </Link>
              
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                <div className="bg-gradient-to-r from-teal-200 to-lime-200 inline-block text-transparent bg-clip-text text-center mb-4 font-bold text-6xl pt-12">my journal entries.</div>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className='text-white opacity-50'>
                  Bloom & Grow: Your Daily Dose of Plant Love 🌸
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex gap-24">
                    <button onClick={clickAdvice} className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold">💭 Get Advice</button>
                    <button onClick={clickForum} className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold">🌿 Forum</button>
                    <button onClick={clickForum} className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold">🌿 Find Plants</button>
                </div>
            </div>

            <div className='bg-gradient-to-r from-teal-200 to-lime-200 shadow-sm p-2 m-8 rounded-lg'>
                <div className='text-[#151321] font-bold text-xl pt-2 pl-2'>
                    Garden Planner
                </div>
                
                <div className="bg-white center-content border-1 gap-48 rounded-lg p-12">
                    {/* Include your Calendar component here */}
                    <Planner />
                </div>
            </div>
        </div>
    );
};
