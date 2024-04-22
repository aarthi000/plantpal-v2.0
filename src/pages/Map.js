import React, { useState, useEffect } from 'react';
import { useAuth } from './login/contexts/AuthContext';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigate } from "react-router-dom"; 

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 30.601433,
  lng: -96.314464,
};

export default function Map() {
  const { currentUser } = useAuth();
  const [pins, setPins] = useState([]);
  const [newPin, setNewPin] = useState({
    latitude: '',
    longitude: '',
    description: '',
  });
  const [selectedPin, setSelectedPin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('pins').onSnapshot((snapshot) => {
      const newPins = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPins(newPins);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPin({ ...newPin, [name]: value });
  };

  const handleAddPin = async () => {
    const db = firebase.firestore();

    if (!currentUser) {
      console.error('User is not authenticated');
      return;
    }

    try {
      await db.collection('pins').add({
        ...newPin,
        userId: currentUser.uid,
      });
      setNewPin({ latitude: '', longitude: '', description: '' });
    } catch (error) {
      console.error('Error adding pin: ', error);
    }
  };

  const clickForum = () => {
    navigate("/");
  };

  const clickAdvice = () => {
    navigate("/advice");
  };

  const clickJournal = () => {
    navigate("/journal");
  };

  const clickGarden = () => {
    navigate("/garden");
  };

  return (
    <div className="w-full bg-[#151321] min-h-screen text-[#151321] flex flex-col gap-4 pb-12">
      <div className='flex justify-between items-center px-12 py-6'>
        <img src="./plantpallogo.png" alt="leaf" className="h-8"/>
        <div className='flex gap-4'>
        <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickForum}>🌿 Forum</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickAdvice}>💭 Get Advice</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickJournal}>📝 My Journal</button>
                    <button className="border-1 px-8 py-2 rounded-lg border-white bg-white bg-opacity-10 text-white font-semibold" onClick={clickGarden}>📝 Garden Planner</button>
        </div>
      </div>
      <div className="bg-gradient-to-r from-teal-200 to-lime-200 inline-block text-transparent bg-clip-text text-center mb-4 font-bold text-6xl pt-12 pb-2">plant your idea.</div>
      <div className="flex justify-center mt-4">
        <div className="flex w-full max-w-6xl">
          <div className="w-3/4 pr-4">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} loading="async">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={(event) => {
                  setNewPin({
                    latitude: event.latLng.lat(),
                    longitude: event.latLng.lng(),
                    description: '',
                  });
                }}
              >
                {pins.map((pin) => (
                  <Marker
                    key={pin.id}
                    position={{ lat: pin.latitude, lng: pin.longitude }}
                    title={pin.description}
                    onClick={() => setSelectedPin(pin)}
                  />
                ))}
                
                {selectedPin && (
                  <InfoWindow
                    position={{ lat: selectedPin.latitude, lng: selectedPin.longitude }}
                    onCloseClick={() => setSelectedPin(null)}
                  >
                    <div>{selectedPin.description}</div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="w-1/4 bg-white p-8 rounded">
            <h3 className="text-xl font-semibold mb-4">Pin Your Plant:</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Latitude:</label>
              <input
                type="text"
                name="latitude"
                value={newPin.latitude}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Longitude:</label>
              <input
                type="text"
                name="longitude"
                value={newPin.longitude}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea
                name="description"
                value={newPin.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                rows="4"
              ></textarea>
            </div>
            <button onClick={handleAddPin} className="bg-green-500 text-white px-4 py-2 rounded">
              Add Pin
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
