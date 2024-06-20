import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { DisplayBody } from './components/Feed/DisplayBody';
import { LoginPage } from './components/Login/LoginPage';
import { RegisterPage } from './components/Register/RegisterPage';
import { ProfilePage } from './components/Profile/ProfilePage';
import { CreatePublication } from './components/Publish/CreatePublication';
import { DisplayUserEvents } from './components/Feed/DisplayUserEvents';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<DisplayBody />} />
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/post" element={<CreatePublication />}/>
          <Route path="/events" element={<DisplayUserEvents />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;