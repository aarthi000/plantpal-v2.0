import React, { useState, useEffect } from 'react';
import { useAuth } from './login/contexts/AuthContext';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.7128,
  lng: -74.0060,
};

export default function Map() {
  const { currentUser } = useAuth();
  const [pins, setPins] = useState([]);
  const [newPin, setNewPin] = useState({
    latitude: '',
    longitude: '',
    description: '',
  });

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

    console.log('Current User:', currentUser); 

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

  return (
    <div className="w-full bg-[#151321] min-h-screen text-[#151321] flex flex-col gap-4 pb-12">
      <div className='flex justify-between items-center px-12 py-6'>
        <img src="./plantpallogo.png" alt="leaf" className="h-8"/>
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex w-full max-w-4xl">
          <div className="w-1/2 pr-4">
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
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="w-1/2 bg-white p-8 rounded">
            <h3 className="text-xl font-semibold mb-4">Add a new pin:</h3>
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
              <input
                type="text"
                name="description"
                value={newPin.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <button onClick={handleAddPin} className="bg-green-500 text-white px-4 py-2 rounded">
              Add Pin
            </button>
          </div>
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
