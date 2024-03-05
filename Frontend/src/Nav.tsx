import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {
  isLoggedIn: boolean;
}

const Navbar = ({ isLoggedIn }: Props) => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/logout');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    navigate('/');
  };

  return (
    <nav className=" p-4 flex justify-between items-center shadow-md">
      <h1 className="text-white text-2xl font-bold">SportScheduler</h1>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      )}
    </nav>
  );
};


export default Navbar;
