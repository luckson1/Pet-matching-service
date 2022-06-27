import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/usersSlices';
import logo from "../images/logo.png"
export const Nav = ({ authToken, setShowModal, showModal, setIsSignUp,isDashboard, isFavPets }) => {
    const dispatch= useDispatch()
    const navigate= useNavigate()

    return (
        <nav>
           <div className="logo-container">
                <img className='logo' src={logo} alt="logo" onClick={() => { navigate("/")}} />
            </div>
            {authToken && isFavPets? <button className='nav-button' onClick={() => { navigate("/favourite-pets")}} disabled={showModal}><i class="bi bi-eye"></i> View Favourites</button>
            : null}
              {authToken && isDashboard? <button className='nav-btn' onClick={() => { navigate("/dashboard") }} >Dashboard</button>
            : null}
            {!authToken? <button className='nav-btn' onClick={() => { setShowModal(true); setIsSignUp(false) }} disabled={showModal}>Login</button>
            : <button className='logout-button' onClick={() => { dispatch(logout())}} disabled={showModal}>Log Out</button>}
        </nav>);
};
