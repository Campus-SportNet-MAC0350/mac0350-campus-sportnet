import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { DisplayBody } from './components/Feed/DisplayBody';
import { LoginPage } from './components/Login/LoginPage';
import { RegisterPage } from './components/Register/RegisterPage';
import { ProfilePage } from './components/Profile/ProfilePage';
import { CreatePublication } from './components/Publish/CreatePublication';
import { DisplayUserEvents } from './components/Feed/DisplayUserEvents';
import { CreateEvent } from './components/Publish/CreateEvent';
import { DisplaySearchPage } from './components/Search/DisplaySearchPage';
import { DisplayParticipants } from './components/Participants/DisplayParticipants'
import { DisplayFollowers } from './components/Follow/DisplayFollowers';
import { DisplayFollowing } from './components/Follow/DisplayFollowing';
import useToken from './components/App/useToken';

const AuthChecker = () => {
  const { token, setToken } = useToken();
  const location = useLocation();

  // console.log("Token = ", token);
  if (!token && location.pathname !== '/register') {
    return <LoginPage setToken={setToken} />;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage setToken={setToken} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<DisplayBody token={token} />} />
      <Route path="/profile/:id?" element={<ProfilePage token={token} />} />
      <Route path="/post" element={<CreatePublication token={token} />} />
      <Route path="/postevent" element={<CreateEvent token={token} />} />
      <Route path="/events" element={<DisplayUserEvents token={token} />} />
      <Route path="/search" element={<DisplaySearchPage token={token} />} />
      <Route path="/participants/:id?" element={<DisplayParticipants token={token} />}  />
      <Route path="/following" element={<DisplayFollowing token={token} />} />
      <Route path="/followers" element={<DisplayFollowers token={token} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AuthChecker />
      </div>
    </Router>
  );
}

export default App;