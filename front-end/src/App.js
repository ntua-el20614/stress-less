import React from 'react';
//import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login'; // Make sure to import the Login component
import SignUp from './Signup'; // Make sure to import the Login component
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
