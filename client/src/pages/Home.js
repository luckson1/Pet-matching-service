import React, { useState } from 'react';
import { Authmodal } from '../components/Authmodal';
import { Nav } from '../components/Nav';

export const Home = () => {
const [showModal, setShowModal]=useState(false)
const [isSignUp, setIsSignUp]=useState(true)
    const authToken = true
    return (
        <div className='overlay'>
            <Nav setShowModal={setShowModal} authToken={authToken} showModal={showModal} setIsSignUp={setIsSignUp}/>
            <div>
                <div className='home'>
                    <h1 className="primary-title">Swipe Right</h1>
                    <button className='primary-button' onClick={()=> {setShowModal(true); console.log("clicked")}}>
                        {authToken ? "Signout" : "create Account"}
                    </button>
                    {showModal && <Authmodal setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>}
                </div>
            </div>
        </ div>);
};
