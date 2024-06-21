import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { DisplayBody } from './components/Feed/DisplayBody';
import { LoginPage } from './components/Login/LoginPage';
import { RegisterPage } from './components/Register/RegisterPage';
import { ProfilePage } from './components/Profile/ProfilePage';
import { CreatePublication } from './components/Publish/CreatePublication';
import { DisplayUserEvents } from './components/Feed/DisplayUserEvents';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<PrivateRoute element={DisplayBody} token={token} />} />
          <Route path="/profile" element={<PrivateRoute element={ProfilePage} token={token} />} />
          <Route path="/post" element={<PrivateRoute element={CreatePublication} token={token} />} />
          <Route path="/events" element={<PrivateRoute element={DisplayUserEvents} token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
