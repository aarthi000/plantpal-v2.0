import React from 'react'
import "../styling/Profile.css"
import logoImage from "../pictures/userprofile.png";
import location from "../pictures/Location.png"

const Profile = () => {
  return (
    <div className='Profile'>

    <div class="logo">
        <img src={logoImage} alt="logo" />
    </div>  

    <div className='user_name'>
        <h1>Example User</h1>
    </div>

    <div className='user_location'>
        <i class="fa-phone"></i>
        <h3>College Station, TX</h3>
    </div>

    </div>

    
  )
}

export default Profile
