// Imports
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import setAuthToken from "../utils/setAuthToken";
const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const userData = {email, password}
        try {
            const apiResp = axios.post(`${REACT_APP_SERVER_URL}/users/login`, userData)
            const {token} = apiResp.data
            //save token to localStorage
            //do the next two lines in registration to redirect to profile right away
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            const decoded = jwt_decode(token)
            props.nowCurrentUser(decoded)
        }catch (err){
            console.log("#########SOMETHING'S WRONG##########")
            console.log(err.message)
            alert("Username or password incorrect")
        }
    }




    return (
        <div className="row mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={"form-group"}>
                <div class={"form-group"}>
                <label htmlFor={"email"}>Email: </label>
                <input type={"email"} name={"email"} value={email} onChange={handleEmail} className={"form-control"} />
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"password"}>Email: </label>
                    <input type={"password"} name={"password"} value={password} onChange={handlePassword}
                           className={"form-control"}/>
                </div>
                <button className={"btn btn-primary"} type={"submit"}>Login</button>

            </form>
        </div>
    )
}

export default Login;
