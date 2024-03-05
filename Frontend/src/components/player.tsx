import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Nav';
import axios from 'axios';

const Player: React.FC = () => {
  const [getUser, setGetUser] = useState<any>({});
  const [allSports, setAllSports] = useState<any>([]);

  useEffect(() => {
    // Fetch user data
    axios.get('/api/users/currentuser')
      .then(response => setGetUser(response.data.data))
      .catch(error => console.error('Error fetching user data:', error));

    // Fetch all sports data
    axios.get('/api/sports/allsport') 
      .then(response => setAllSports(response.data.data))  // Access response.data.data
      .catch(error => console.error('Error fetching sports data:', error));
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

        <div className="flex items-center justify-center h-screen">
          <div className=" p-8 rounded shadow-lg w-auto">

            <div className="mt-10">
              <Link to="/player">Home</Link>
            </div>
            <div className="mx-auto pt-6 mt-3 text-6xl flex my-10">
              <h1>Welcome {getUser.fname}</h1>
            </div>
            <hr />
            <div className="text-xl">
              <h1 className="text-2xl">Available sports</h1>
              <ul className=" gap-10">
                {allSports.map((sport: any) => (
                  <div key={sport._id} >
                    <Link to={"/session"}
                      state={sport.sportName}
                    >
                      <li className="bg-lime-950 text-white p-2  rounded-lg border-2 border-teal-400 hover:bg-white hover:text-black w-1/2">
                        {sport.sportName}
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
