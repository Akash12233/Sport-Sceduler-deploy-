import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Nav';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const HandleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      if (response.data.data.user.role === "admin") {
        history('/useradmin');
      } else {
        history('/player');
      }

      // Handle success, e.g., redirect to another page
    } catch (error) {
      // Handle error here, e.g., display an error message
      console.error('Error during login:', error);
      showAlert("Invalid email or password. Please try again.");
    }
  };

  const showAlert = (message: string) => {
    alert(message);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: 'url(/img1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',  // Ensure the background covers the entire viewport height
        }}
      >
        <Navbar isLoggedIn={false} />

        <div className="bg-white max-w-md mx-auto p-6 mt-10 rounded-md  shadow-lg bg-opacity-60">
          <h2 className="text-2xl font-semibold mb-6">Login Page</h2>
          <form onSubmit={HandleLogin}>
            <label className="block mb-4">
              Email:
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="border p-2 w-full"
                required
              />
            </label>
            <label className="block mb-4">
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="border p-2 w-full"
                required
              />
            </label>
            <div className="mb-4">
              <Link to="/Signup" className="text-green-500">
                New User?
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 mr-2 hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
