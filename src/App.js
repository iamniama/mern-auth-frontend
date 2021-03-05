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
const PrivateRoute = ({component: Component, ...rest}) => {
    let token = localStorage.getItem('jwt-token')
    console.log("=====> Private Route mode engage")
    return <Route {...rest} render={(props) => {
        return token ? <Component {...rest} {...props} /> : <Redirect to={"/login"} />
    } } />
}

function App() {
    const [currentUser, setCurrentUser] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(true) //? why would we START with true?
 
  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwt-token')){
        setIsAuthenticated(false)
        console.log(`============> not authenticated`)
    }else{
        token = jwt_decode(localStorage.getItem('token'))
        setAuthToken(localStorage.getItem('token'))
        setCurrentUser(token)
    }
  }, []);

    const nowCurrentUser = (userData) => {
        console.log("===============> nowCurrentUser running")
        setCurrentUser(userData)
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        if (localStorage.getItem('jwt-token')){
            ///remove token from localStorage
            localStorage.removeItem('jwt-token')
            setCurrentUser(null)
            setIsAuthenticated(false)
        }
    }

  return (
    <div className="App">
      <h1>MERN Authentication</h1>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated}/>
      <div className={"container mt-5"}>
          <Switch>
              <Route path={"/signup"} component={Signup} />
              <Route
                path={"/login"}
                render={(props)=> <Login {...props}
                nowCurrentUser={nowCurrentUser}
                setIsAuthenticated={setIsAuthenticated}
                user={currentUser}
                />}
              />
              <PrivateRoute path={"/profile"} component={Profile} user={currentUser} handleLogout={handleLogout} />
              <Route exact path={"/"} component={Welcome} />
              <Route path={"/about"} component={About} />
          </Switch>
      </div>
        <Footer />
    </div>
  );
}

export default App;
