// CreateSession.tsx

import React, { useEffect, useState } from 'react';
import { Link , useLocation, useNavigate} from 'react-router-dom';
import Navbar from '../Nav';
import axios from 'axios';


const CreateSession: React.FC = () => {
  const [allSessions, setAllSessions] = useState<any[]>([]); // Ensure allSessions is initialized as an array
  const [getUser, setGetUser] = useState<any>({});
  const [getsport, setGetsport] = useState<any>({});
  const location = useLocation();
  const sportName = location.state ? location.state.sportName : null;
  const navigate= useNavigate();


  useEffect(() => {
    // Fetch user and session data. Replace with your actual API calls.
    // Ensure that your server-side logic is implemented on the backend.

    // Fetch user data
    axios.get('/api/users/currentuser')
      .then(response => setGetUser(response.data.data))
      .catch(error => console.error('Error fetching user data:', error));

    // Fetch all sessions data
    axios.get(`/api/sessions/getAllsession/${sportName}`)
      .then(response => {
        const sessionsData = response.data.data;
        console.log("sessionsData", sessionsData);
        // Check if the data is an array before setting the state
        if (Array.isArray(sessionsData)) {
          setAllSessions(sessionsData);
        } else {
          console.error('Invalid data format for sessions:', sessionsData);
        }
      })
      .catch(error => console.error('Error fetching sessions data:', error));

    // Fetch sports data
    axios.get(`/api/sports/${sportName}`)
      .then(response => setGetsport(response.data.data))
      .catch(error => console.error('Error fetching sports data:', error));
      console.log(getsport)

  });


  const deleteSport = async (id: string) => {
    try {
      const response = await axios.post('/api/sports/deletesport', { id });
      console.log('Successfully deleted sport:', response.data);
  
      // Handle success, e.g., redirect to another page
    } catch (error) {
      console.error('Error during sport deletion:', error);
      // Handle error here, e.g., display an error message
    }
  };

  const addPlayer = (player: string, id: string)  => {
    // Implement your logic for adding a player
    console.log(id, player);
     const response= axios.post('/api/sessions/addplayer', { id, player});
    console.log(response);
    navigate("/useradmin");
   
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
        <div className="bg-white rounded shadow-lg bg-opacity-60 w-3/4: sm:w-1/3">
      <div >
        <Link to="/useradmin">Home</Link> - <Link to={`/createsessions`} state={sportName} >{getsport.sportName}</Link>
      </div>
      <div>
        <p className="text-6xl ">{getsport.sportName}</p> 
        {getUser.role === 'admin' && (
          <>
            <Link to="/createsport" onClick={() => deleteSport(getsport._id)} className="text-right  text-lime-950 p-2">
              Edit
            </Link>
            <Link to="/useradmin" onClick={() => deleteSport(getsport._id)} className="text-right  text-lime-950">
              Delete
            </Link>
          </>
        )}
      </div>

      {getUser.role === 'admin' && ( <p className="text-2xl">Created by you</p>)}

      {allSessions.map((session) => {
        if (getUser.id === session.userId) {
          return (
            <Link key={session.id} to={'/session'}
             state={sportName}
            >
              <div className="w-auto rounded-lg flex text-white  bg-lime-950 h-16 cursor-pointer overflow-hidden hover:bg-white hover:text-lime-950 border-2 border-lime-950">
                {session.time}
                <p className="text-right ">
                  {session.noplayers - session.playername.length} slots available
                </p>
              </div>
            </Link>
          );
        }
        return null;
      })}
     
      <br />
      <hr />
      <br />
      <p className="text-2xl">Other Sessions</p>

      {allSessions.map((session) => {
        if (getUser.id !== session.userId && !getUser.sessionId.includes(session.id)) {
          return (
            <button onClick={() => addPlayer(getUser.fname, session._id)} className="mx-auto"
            >
              <div className="w-auto  rounded-lg flex text-white  bg-lime-950 h-16 cursor-pointer overflow-hidden hover:bg-white hover:text-lime-950 border-2 border-lime-950">
                {session.time}
                <p className="text-right ">
                  {session.noplayers - session.playername.length} slots available
                </p>
              </div>
            </button>
          );
        }
        return null;
      })}

      <br />
      <hr />
      <br />
      <p className="text-2xl">Joined Sessions</p>

      {getUser.sessionId !== null &&
        allSessions.map((session) => {
          if (getUser.sessionId.includes(session.id)) {
            return (
              <Link key={session.id} to={'/session'}
             state={sportName}
            >
                <div className="w-auto  rounded-lg flex text-white  bg-lime-950 h-16 cursor-pointer overflow-hidden hover:bg-white hover:text-lime-950 border-2 border-lime-950">
                  {session.time}
                  <p className="text-right ">
                    {session.noplayers - session.playername.length} slots available
                  </p>
                </div>
              </Link>
            );
          }
          return null;
        })}

      {getUser.role === 'admin'  && (
        <div className="container mx-auto mt-10 p-auto text-xl gap-10">
          <Link to={`/createsession/`} 
          state={ getsport.sportName}>
            Create a new session
          </Link>

        </div>
      )}
    </div>
    </div>
    </div>
    </>
  );
};


export default CreateSession;
