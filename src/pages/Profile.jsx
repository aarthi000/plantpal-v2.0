import React, { useState, useRef } from 'react';
import './Profile.css';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useAuth } from "./login/contexts/AuthContext";
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import {AiOutlineHeart} from "react-icons/ai"

const Profile = () => {
    const { currentUser } = useAuth();
    const inputRef = useRef(null);
    const [plants, setPlants] = useState([
        { name: "Tomato Plant", image: require("../pictures/tomato_plant.png") },
        { name: "Mango Plant", image: require("../pictures/mango.png") },
        { name: "Apple Tree", image: require("../pictures/apple.png") },
        { name: "Orange Plant", image: require("../pictures/orange.png") }
    ]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newPlantName, setNewPlantName] = useState('');
    const [newPlantImage, setNewPlantImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setProfileImage(event.target.files[0]);
        }
    };

    const handleAddPlant = () => {
        if (newPlantImage) {
            // Here you would typically upload the image to a server and get the URL in response
            console.log("File to be handled:", newPlantImage);
            setPlants(currentPlants => [
                ...currentPlants,
                { name: newPlantName, image: URL.createObjectURL(newPlantImage) }
            ]);
            setNewPlantName('');
            setNewPlantImage(null);
            setDialogOpen(false);
        }
    };

    const handlePlantImageChange = (event) => {
        setNewPlantImage(event.target.files[0]);
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
                <div className='circle' onClick={handleImageClick}>
                    {profileImage ? (
                        <img src={URL.createObjectURL(profileImage)} alt='Profile' className='img-display-after' />
                    ) : (
                        <img src={require('../pictures/userprofile.png')} alt='Default Profile' className='img-display-before' />
                    )}
                    <input
                        type='file'
                        ref={inputRef}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        accept="image/*"
                    />
                </div>
                <div className='name'>
                    {currentUser && <h2>{currentUser.email}</h2>}
                </div>
                {/* User stats and listing section code */}
                <div className='name'>
            {currentUser && (
                <div>
                    <h2>{currentUser.email}</h2>
                </div>
            )}
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


        <div className='listingSection'>
                <div className='heading flex'>
                    <h1>My Listings </h1>
                    <button className='btn flex' onClick={() => setDialogOpen(true)}>
                        Add Plant <BsArrowRightShort className='icon'/>
                    </button>
                </div>


                <div className='secContainer flex'>
                    {plants.map((plant, index) => (
                        <div key={index} className='singleItem'>
                            <AiOutlineHeart className='icon'/>
                            <img src={plant.image} alt={plant.name}/>
                            <h3>{plant.name}</h3>
                        </div>
                    ))}
                </div>

                
            </div>


                <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Add New Plant</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Plant Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newPlantName}
                            onChange={(e) => setNewPlantName(e.target.value)}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handlePlantImageChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button component="span" startIcon={<PhotoCamera />}>
                                Upload Image
                            </Button>
                        </label>
                        {newPlantImage && <p>{newPlantImage.name}</p>}
                    </DialogContent>
                    <Button onClick={handleAddPlant}>Submit</Button>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                </Dialog>
            </div>
        </div>
    );
};

export default Profile;
