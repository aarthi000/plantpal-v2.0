import React, { useState, useEffect } from 'react';
import './Profile.css';
import '../pictures/userprofile.png'
import { useAuth } from './login/contexts/AuthContext'
import { useNavigate } from 'react-router-dom';


const Profile = () => {

    const navigate = useNavigate();

    const { currentUser } = useAuth(); // Destructure currentUser from useAuth
    const [userData, setUserData] = useState({
        name: '',
        location: 'New York, United States',
        university: 'Columbia University - New York'
    });

    useEffect(() => {
        if (currentUser) {
            setUserData({
                ...userData,
                name: currentUser.email
            });
        }
    }, [currentUser]);

    const clickHome = () => {
        navigate('/');
    };
    
  return (
    <div className="bg-[#151321] min-h-screen">
      <div className='flex justify-between items-center align-center px-12 py-6'>
          <img src="./plantpallogo.png" alt="leaf" className="h-8"/>

          <div className='flex gap-4'>
            <button onClick={clickHome} className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold text-xs" > Home </button>
            <div className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold w-[100px] text-xs font-semibold">
                <button >logout</button>
          </div>
          </div>
      </div>

      <div className="flex justify-center">
          <div className="flex gap-24">

          </div>
      </div>
      
    <div className='profileCard'>
        <div className='circle'></div>
        <div className='name'>
            <h2>{userData.name}</h2>
        </div>
        
        <div className='stat'>
            <p>65</p>
            <p>43 </p>
            <p>21 </p>
        </div>
        <div className='stats'>
            <p>Friends</p>
            <p>Comments </p>
            <p>Posts</p>
        </div>
        
    </div>

    
      
    </div>

    
  );
}

export default Profile
