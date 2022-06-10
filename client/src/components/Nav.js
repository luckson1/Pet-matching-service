import React from 'react';
import logo from "./images/logo.png"
export const Nav = ({authToken, setShowModal,showModal, setIsSignUp}) => {
    
    return(<nav>
        <div className="logo-container">
            <img className='logo' src={logo} alt="logo" />
        </div>
       { !authToken && <button className='nav-button' onClick={()=> {setShowModal(true); setIsSignUp(false)}} disabled={showModal}>Login</button>}
    </nav>);
};
