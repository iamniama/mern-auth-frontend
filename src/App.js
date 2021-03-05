// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Signup from './components/Signup'
import Login from './components/Login'
import About from './components/About'
import Footer from './components/Footer'
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";

// CSS
import './App.css';

// Components

function App() {
  // Set state values
 
  useEffect(() => {
    
  }, []);

  return (
    <div className="App">
      <h1>MERN Authentication</h1>
      <Profile />
    </div>
  );
}

export default App;
