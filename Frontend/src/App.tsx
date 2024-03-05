import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Useradmin from './components/useradmin';
import Createsport from './components/createsport';
import Createsessions from './components/createsessions';
import CreateSessionForm from './components/createsession';
import Player from './components/player';
import SessionPage from './components/session';

const App: React.FC = () => {
  
  console.log("I am Heher!!")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/useradmin" element={< Useradmin />} />
        <Route path="/createsport" element={< Createsport/>} />
        <Route path="/createsessions" element={< Createsessions/>} />
        <Route path='/createsession' element={<CreateSessionForm />} />
        <Route path='/player' element={< Player />} />
        <Route path='/session' element={< SessionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
