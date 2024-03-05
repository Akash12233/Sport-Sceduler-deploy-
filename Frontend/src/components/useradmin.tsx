import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../Nav';
import axios from 'axios';

const UserAdmin :React.FC = () => {
  const navigate = useNavigate();

  // State to store user data
  const [userData, setUserData] = useState<any>({});

  // State to store user's sports data
  const [userSports, setUserSports] = useState([]) ;

  

  // Fetch user data and sports data from the database
  useEffect(() => {
    // Fetch user data
    axios.get('/api/users/currentuser')
      .then(response => setUserData(response.data.data))
      .catch(error => console.error('Error fetching user data:', error));

    // Fetch user sports data
    axios.get('/api/sports/sportuser')
      .then(response => setUserSports(response.data.data))
      .catch(error => console.error('Error fetching user sports data:', error));

  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/img2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Navbar isLoggedIn={true} />
        <div className="flex justify-center items-center h-screen">
          <div className=" p-1 m-1 rounded shadow-lg w-1/2 h-auto bg-white bg-opacity-60 shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Welcome {userData.fname }</h1>
            <button
              className="bg-green-500 text-white rounded"
              onClick={() => navigate('/createsport')}
            >
              Create Sport
            </button>
            <div className="text-xl">
              <h1 className="text-2xl">Available sports</h1>
              <ul className=" gap-10">
                {userSports.length === 0 ? (
                  <p>No sports available.</p>
                ) : (
                  userSports.map((sport: any) => (
                    <div key={sport._id} className="flex-auto">
                      <Link
                        to={`/createsessions/`}
                        state={{sportName:sport.sportName }}
                        className="flex gap-10 text-white hover:bg-white hover:text-black"
                      >
                        {sport.sportName}
                      </Link>
                    </div>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdmin;
