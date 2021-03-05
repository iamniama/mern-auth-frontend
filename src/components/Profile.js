import React from 'react';
import { Link } from 'react-router-dom';

const Profile = (props) => {
    const {user, handleLogout} = props;
    const { id, name, email, exp } = user
    const expirationTime = new Date(exp * 1000)
    let currentTime = Date.now()

    // make a condition that compares the two
    if (currentTime >= expirationTime){
        handleLogout();
        alert("Your session has expired, please login again")
    }

    const userData = user ?
        (<div>
            <h1>Profile</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>ID: id</p>
        </div>) : <h2> Loading......</h2>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <div className={"text-center pt-4"}>
            {user ? userData : errorDiv()}
            {/* { Add code here } */}
        </div>
    );

}

export default Profile;