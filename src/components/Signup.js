// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if (password.length >= 8 && password === confirmPassword){
            try {
                const userInfo = {name, email, password}
                const newUser = await axios.post(`${REACT_APP_SERVER_URL}/users/register`, userInfo)
                console.log(newUser)
                setRedirect(true)
            }catch(err) {
                console.log("######### ERROR IN SIGNUP ########")
                console.log(err.message)
            }
        }else {
            if (password !== confirmPassword) return alert('Password must match, please try again')
            alert("Password must 8 or more characters, please try again")

        }


        }




    const handleName = async(e) =>{
        setName(e.target.value)
    }

    const handleEmail = async(e) =>{
        setEmail(e.target.value)
    }

    const handlePassword = async(e) =>{
        setPassword(e.target.value)
    }

    const handleConfirmPassword = async(e) =>{
        setConfirmPassword(e.target.value)
    }

    if (redirect) return <Redirect to="/login" /> // You can have them redirected to profile (your choice)

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={"form-group"}>
                            <label htmlFor={"name"}>Name: </label>
                            <input type={"text"} name={"name"} className={"form-control"} value={name} onChange={handleName}/>
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"email"}>Email: </label>
                            <input type={"text"} name={"email"} className={"form-control"} value={email} onChange={handleEmail}/>
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"password"}>Password: </label>
                            <input type={"password"} name={"password"} className={"form-control"} value={password} onChange={handlePassword}/>
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"confirmPassword"}>Password Again: </label>
                            <input type={"password"} name={"confirmPassword"} className={"form-control"} value={confirmPassword} onChange={handleConfirmPassword}/>
                        </div>
                        <button type={"submit"} className={"btn btn-primary float-right"}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
