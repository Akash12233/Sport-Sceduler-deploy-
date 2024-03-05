import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import Navbar from '../Nav';
import axios from 'axios';


const SessionPage: React.FC = () => {
  const location= useLocation();
  const sportName  = location.state;
  const [getUser, setGetUser] = useState<any>({});
  const [allSessions, setAllSessions] = useState<any>([{}]);
  
  const navigate=useNavigate();
  
   // Replace this with your user data fetching logic
  useEffect(() => {
    // Fetch session data. Replace with your actual API call. `/api/session/${sportname}`
         axios.get('/api/users/currentuser')
          .then(response => {
            setGetUser(response.data.data);

            if(response.data.data.role!=='player'){
              axios.get(`/api/sessions/getsession/${sportName}/${response.data.data._id}`)
                  .then(response => {
                    // Assuming the response.data is the expected data structur
                    console.log(response.data.data);
                    setAllSessions(response.data.data);
                  })
                  .catch(error => {
                    console.error('Error fetching session data:', error);
                  });

            }
            else{
              axios.get(`/api/sessions/getAllsession/${sportName}`)
              .then(response => {
                // Assuming the response.data is the expected data structur
                console.log(response.data);
                setAllSessions(response.data.data);
              })
              .catch(error => {
                console.error('Error fetching session data:', error);
              });

            }
            
            
          })
          .catch(error => console.error('Error fetching user data:', error));

        // Fetch session data
        
  }, []);

  const cancelSession = (id: string, sportname: string, user: string) => {
    const response=axios.post('/api/sessions/cancelsession', { id, sportname, user});
    console.log(response);
    navigate("/createsport");

  };

  const removePlayer = (player: string, id: string) => {
    console.log(player, id);
    const response=axios.post('/api/sessions/removeplayer', { id, player});
    console.log(response);
    navigate("/session" , {state: sportName});
  };

  const addPlayer = (player: string, id: string)  => {
    // Implement your logic for adding a player
    console.log(id, player);
     const response= axios.post('/api/sessions/addplayer', { id, player});
    console.log(response);
    navigate("/session" , {state: sportName});
   
  };

  return (
    <>
    <div
        style={{
          backgroundImage: "url('/img2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',  // Ensure the background covers the entire viewport height
        }}
      >
    <Navbar isLoggedIn={true}/>

    <div className=' bg-white gap-10  rounded-lg p-10 opacity-60'>
    <div className="mt-10">
    {getUser.role === 'player' && (
      <div>
      <a href="/player">Home</a> -{' '}
      <span>{sportName} session</span> 
      </div>
    )}

    {getUser.role === 'admin' && (
      <div>
      <a href="/useradmin">Home</a> -{' '}
      <span> {sportName} session</span> 
      </div>
    )}
            
          </div>
      {allSessions.map((session:{_id: string, noplayers:number, userId: string, sportname: string, time: string, address: string, playername: [string]}, index:number) => (
        <div key={index} className="container mx-auto">
         

          <div className="my-10 text-2xl m-10">
            <p>Date & Time: {session.time}</p>
            <br />
            <p>Address: {session.address}</p>
          </div>

          <div className="m-10">
        <h1 className="text-6xl">Players</h1>
        <div className="flex flex-wrap">
          {session.playername && session.playername.map((player: string, playerIndex: number) => (
            <div
              key={playerIndex}
              className="mt-2 rounded-lg text-white px-6 sm:px-10 py-4 bg-lime-950  h-auto cursor-pointer flex justify-between items-center overflow-auto hover:bg-white hover:text-lime-950 border-2 border-lime-950"
            >
              <a href="#" className="">
                {player}
              </a>
              {session.userId === getUser._id && (
                <a href="#" onClick={() => removePlayer(player, session._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>


          {session.userId === getUser._id && (
          <div className="m-10 gap-10 text-3xl">
            <button  onClick={() => cancelSession(session._id, session.sportname, getUser.role)} className="mx-5">
              Edit Session
            </button>
            <button onClick={() => cancelSession(session._id, session.sportname, getUser.role)}>
              Cancel Session
            </button>
          </div>
        )}
    
      { getUser.role==='player' &&   getUser.sessionId !== null && getUser.sessionId !== undefined && !getUser.sessionId.includes(session._id) && session.noplayers - (session.playername?.length || 0) >= 1 && (
        <div className="m-10 gap-10 text-3xl">
          < button onClick={() => addPlayer(getUser.fname, session._id)} className="mx-auto">
            Join Session
          </button>
        </div>
      )}


        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default SessionPage;
