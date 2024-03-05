// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../Nav';
import axios from 'axios';
const Signup: React.FC = () => {
  const [fname, setfirstname] = useState('');
  const [lname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('player'); // Default role is set to 'player'
  const navigate = useNavigate();
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(fname,
      lname,
      email,
      role,
      password);

    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('/api/users/register', {
        fname,
        lname,
        email,
        role,
        password,
      });

      // Handle success, you may want to show a success message or navigate to a different page
      console.log('Registration successful:', response.data);
      navigate('/');  // Example: navigate to the home page
    } catch (error) {
      // Handle errors, you may want to show an error message to the user
      console.error('Registration failed:', error);
    }

    // Your login logic goes here (e.g., API call, validation, etc.)
    console.log('Logging in with:', { email, password, role });

    // After successful login, navigate to the desired page
    // For example, navigate to a '/dashboard' route
    navigate('/');
  };

  return (
    <>
    <div
        style={{
          backgroundImage: "url('/img1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',  // Ensure the background covers the entire viewport height
        }}
      >
        <Navbar isLoggedIn={false} />
        <div className="bg-white max-w-md mx-auto p-6 mt-10 rounded-md bg-green bg-opacity-80 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
          <form onSubmit={handleLogin}>
            <label className="block mb-4">
              First Name:
              <input
                type="text"
                value={fname}
                onChange={(e) => setfirstname(e.target.value)}
                className="border p-2 w-full"
              />
            </label>

            <label className="block mb-4">
              Last Name:
              <input
                type="text"
                value={lname}
                onChange={(e) => setlastname(e.target.value)}
                className="border p-2 w-full"
              />
            </label>

            <div className="mb-4">
              <label className="mr-4">
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                />
                <span className="ml-2">Admin</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="player"
                  checked={role === 'player'}
                  onChange={() => setRole('player')}
                />
                <span className="ml-2">Player</span>
              </label>
            </div>

            <label className="block mb-4">
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="border p-2 w-full"
              />
            </label>

            <label className="block mb-4">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
              />
            </label>

            <div className='mb-4'>
              <Link to="/" className="text-green-500">Already an User?</Link>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 hover:bg-blue-600 rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      </>
    );
};

export default Signup;
