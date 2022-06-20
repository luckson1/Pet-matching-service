import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/usersSlices';
import logo from "./images/logo.png"
export const Nav = ({ authToken, setShowModal, showModal, setIsSignUp }) => {
    const dispatch= useDispatch()

    return (
        <nav>
           <div className="logo-container">
                <img className='logo' src={logo} alt="logo" />
            </div>
            {!authToken? <button className='nav-button' onClick={() => { setShowModal(true); setIsSignUp(false) }} disabled={showModal}>Login</button>
            : <button className='logout-button' onClick={() => { dispatch(logout())}} disabled={showModal}>Log Out</button>}
        </nav>);
};
