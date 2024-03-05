// CreateSessionForm.tsx

import React, { useState, useEffect } from 'react';
import { Link,  useLocation ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Nav';

const CreateSessionForm: React.FC = () => {
  const location= useLocation();
  const navigate=useNavigate();
  const sportName = location.state ? location.state : null;
  const [getUser, setGetUser] = useState<any>({});
  
  const [dateTime, setDateTime] = useState('');
  const [address, setAddress] = useState('');
  const [playername, setPlayername] = useState('');
  const [noPlayer, setNoPlayer] = useState('');
  const sessioncreated= true;

  useEffect(() => {
    axios.get('/api/users/currentuser')
      .then(response => setGetUser(response.data.data))
      .catch(error => console.error('Error fetching user data:', error));
    
    
  })

  const handleSubmit = async(e: React.FormEvent) =>
    {
    e.preventDefault();
    // Implement the logic to submit the form data. Replace with your actual API call.
    const userId=getUser._id;
    const playernames=playername.split(',');
    const noplayer=+noPlayer;
    console.log(userId)
    try {
      const response= await axios.post('/api/sessions/addsession', {
        sportName,
        dateTime,
        address,
        playernames,
        noplayer,
        sessioncreated,
        userId
      })
      console.log(response);
    } 
    
    catch (error) {
      console.log("Session not registered" , error)
    }
    
    console.log('Form submitted:', {
      sportName,
      dateTime,
      address,
      playernames,
      noplayer,
      sessioncreated: true,
      userId
    });

    // You can add your logic to send the form data to the server here.
    navigate('/session', {state: sportName});
  };

  return (
    <>
     <div
         style={{
            backgroundImage: "url('/img3.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
            minHeight:'100vh'
          }}>
            
            <Navbar isLoggedIn={true}/>

            <div className="bg-white bg-opacity-40 p-2 flex items-center justify-center h-screen  rounded shadow-lg">
              <div className=" w-1/2 : sm:w-auto ">
                <div >
                <Link to="/useradmin">Home</Link> - <Link to={`/createsession`} state={sportName}>{sportName}</Link>
                </div>
        
            <form className="container" action="/createsession" method="POST" onSubmit={handleSubmit}>
                <h2 className="text-6xl my-10">Create Session</h2>
              
                <input type="hidden" name="_csrf" value="replace-with-your-csrf-token" />
                <input type="hidden" name="sportname" id="sportname" value={sportName} />
                <input type="hidden" name="user" id="user" value="replace-with-your-user-role" />
                <div>
                <p className="mb-0 text-2xl">Input Date and Time of session</p>
                <input
                    type="datetime-local"
                    name="dateTime"
                    id="date"
                    className="border-2  rounded w-60 border-lime-950"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
                </div>
                <div>
                <p className="mb-0 text-2xl">Input Address of session to be held</p>
                <textarea
                    name="address"
                    id="address"
                    rows={1}
                    className="border-2  rounded border-lime-950"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                </div>
                <div>
                <p className="mb-0 text-2xl">Input Number of Players</p>
                <textarea
                    name="noPlayer"
                    id="noPlayer"
                    
                    rows={1}
                    className="border-2 rounded border-lime-950"
                    value={noPlayer}
                    onChange={(e) => setNoPlayer(e.target.value)}
                ></textarea>
                </div>
                <div>
                <p className="mb-0 text-2xl">Enter Names of Player (seperate by Commas)</p>
                <textarea
                    name="playername"
                    id="playername"
                    
                    rows={1}
                    className="border-2  rounded border-lime-950"
                    value={playername}
                    onChange={(e) => setPlayername(e.target.value)}
                ></textarea>
                </div>
                
                <div>
                <button
                  type="submit"
                  name="submit"
                  id="submit"
                  className="bg-lime-950 text-white cursor-pointer rounded-lg border-2 border-lime-950 hover:bg-white hover:text-black"
                >
                  Submit
                </button>
              </div>

            </form>
            </div>
            </div>
        </div>
    </>
  );
};

export default CreateSessionForm;
