import React, { useState, useRef, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from "react-router-dom";

import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useAuth } from "./login/contexts/AuthContext";
import { AiFillHeart } from "react-icons/ai";
// import {AiOutlineHeart} from "react-icons/ai"
import EditIcon from '@mui/icons-material/Edit';
import { PhotoCamera } from '@mui/icons-material';
import { SomeIcon } from '@mui/icons-material';


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
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedBio, setEditedBio] = useState('');
    const [editedLocation, setEditedLocation] = useState('');
    const navigate = useNavigate();
    const [isWishlistDialogOpen, setWishlistDialogOpen] = useState(false);
    const [newItem, setNewItem] = useState('');

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            setWishlist([...wishlist, newItem]);
            setNewItem(''); // Clear the input after adding
        } else {
            alert('Please enter a valid item.');
        }
    };

    const handleRemoveItem = (index) => {
        setWishlist(wishlist.filter((_, i) => i !== index));
    };
    
    
    


    // Add this new state to your component
        const [wishlist, setWishlist] = useState([]);



    const handleEditProfile = () => {
        console.log("Profile updated with: ", editedName, editedBio, editedLocation);
        // updateUserProfile(currentUser.id, editedName, editedBio, editedLocation);

        setEditDialogOpen(false);
    };


    const clickForum = () => {
        navigate("/");
    }
  
    const clickJournal = () => {
        navigate("/journal");
    }
  
    const clickMap = () => {
      navigate("/map");
    }
  
    const clickGarden = () => {
      navigate("/garden");
    }

    const handleDialogClose = () => {
        setWishlistDialogOpen(false);
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
        if (newPlantName && newPlantImage) {  // Check if both name and image are provided
            const newPlant = {
                name: newPlantName,
                image: URL.createObjectURL(newPlantImage)  // Create a URL for the image file
            };
            setPlants(currentPlants => [...currentPlants, newPlant]);  // Add new plant to the array
            setNewPlantName('');  // Reset the plant name
            setNewPlantImage(null);  // Reset the plant image
            setDialogOpen(false);  // Close the dialog
        } else {
            alert('Please fill all fields!');  // Alert if one of the fields is missing
        }
    };

    const handlePlantImageChange = (event) => {
        if (event.target.files[0]) {
            setNewPlantImage(event.target.files[0]);  // Update newPlantImage with the selected file
        }
    };

    useEffect(() => {
        if (currentUser) {
          setEditedName(currentUser.name || ''); // Default to empty string if undefined
          setEditedBio(currentUser.bio || '');
          setEditedLocation(currentUser.location || '');
        }
      }, [currentUser]); // Depend on currentUser to re-run this effect
      

    return (
        <div className="bg-[#151321] min-h-[900px] flex flex-col gap-12">
            <div className='flex justify-between items-center align-center px-12 py-6'>
                <img src="./plantpallogo.png" alt="leaf" className="h-8"/>
                <div className='flex gap-4'>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold text-xs" onClick={clickForum}>🌿 Forum</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold text-xs" onClick={clickJournal}>📝 My Journal</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold text-xs" onClick={clickMap}>🌿 Find Plants</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold text-xs" onClick={clickGarden}>🌿 Garden Planner</button>
                    <div className="border-1 px-8 py-2 rounded-lg border-red-400 bg-red-300 bg-opacity-10 text-red-400 font-semibold w-[100px] text-xs font-semibold">
                        <button >logout</button>
                </div>
                </div>
            </div> 

            <div className='profileCard'>
            <div className='flex justify-between px-24 py-8'>
                <div className='flex items-center align-center gap-2'>
                    <EditIcon/>
                    <button className= 'btn-flex' onClick={() => setEditDialogOpen(true)} style={{ cursor: 'pointer' }} >Info</button>
                </div>
                <div className='flex items-center align-center gap-2'>
                    <AiFillHeart/>
                    <button className= 'btn-flex' onClick={() => setWishlistDialogOpen(true)} style={{ cursor: 'pointer' }} >Wishlist</button>
                </div>
            </div>
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
            {currentUser && (
                <div>
                    <h2>{currentUser.name}</h2>
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
                        Add Plant 
                    </button>
                </div>


                <div className='secContainer flex'>
                    {plants.map((plant, index) => (
                        <div key={index} className='singleItem'>
                            <AiFillHeart className='icon'/>
                            <img src={plant.image} alt={plant.name}/>
                            <h3>{plant.name}</h3>
                        </div>
                    ))}
                </div>


                

                <Dialog open={isWishlistDialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>My Wishlist</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="new-item"
                            label="Add New Item"
                            type="text"
                            fullWidth
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            variant="standard"
                        />
                        <Button onClick={handleAddItem} color="primary" style={{ marginTop: '10px' }}>
                            Add
                        </Button>
                        {wishlist.length > 0 ? (
                            <ul>
                                {wishlist.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                        <Button onClick={() => handleRemoveItem(index)} color="secondary">
                                            Remove
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No items in your wishlist.</p>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>
                
            </div>

            <Dialog open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)}>
    <DialogTitle>Edit Profile</DialogTitle>
    <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="edit-name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
        />
        <TextField
            margin="dense"
            id="edit-bio"
            label="Bio"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
        />
        <TextField
            margin="dense"
            id="edit-location"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            value={editedLocation}
            onChange={(e) => setEditedLocation(e.target.value)}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleEditProfile}>Save</Button>
    </DialogActions>
</Dialog>



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
