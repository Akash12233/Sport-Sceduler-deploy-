// Createsport.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../Nav';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Createsport: React.FC = () => {
  const [sportName, setSportName] = useState('');

  const navigate= useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSportName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("I am here");
  
    try {
      const response = await axios.post('/api/sports/addsport', {
        sportName
      });
  
      console.log('sport registered:', response.data);

      navigate('/createsessions', { state: { sportName } });  // Pass the sportName to the next page

    } catch (error) {
      // Handle error here, e.g., display an error message
      console.error('Error during registration:', error);
    }
  
    console.log(`Sport name submitted: ${sportName}`);
    // You can add your logic for submitting the sport name to the server here
  };
  

  return (
    <>
    <div
        style={{
          backgroundImage: "url('/img3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',  // Ensure the background covers the entire viewport height
        }}
      >
    <Navbar isLoggedIn={true}/>
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-1/2 bg-opacity-60">
        <h1 className="text-2xl font-bold mb-4">Create the Sport</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Enter the Sport:</label>
          <input
            type="text"
            value={sportName}
            onChange={handleInputChange}
            placeholder="Eg. cricket, football"
            className="w-full p-2 mb-4 border rounded-md"
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default Createsport;
