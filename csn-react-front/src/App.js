import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { DisplayBody } from './DisplayBody';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<DisplayBody />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// https://reactjs.org -> react documentation