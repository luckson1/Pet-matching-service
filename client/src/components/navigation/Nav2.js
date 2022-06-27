import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/usersSlices';
export const Nav = ({ authToken }) => {
    const dispatch= useDispatch()
    const navigate= useNavigate()

    return (
        <nav>
           <button className='nav-button' onClick={() => navigate("/pet-onboarding")}>Add Pet</button>
             <button className='logout-button' onClick={() => { dispatch(logout())}}>Log Out</button>
        </nav>);
};
