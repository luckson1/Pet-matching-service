import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Authmodal } from '../components/Authmodal';
import { Nav } from '../components/navigation/Nav';
import { logout } from '../redux/usersSlices';


export const Home = () => {
const [showModal, setShowModal]=useState(false)
const [isSignUp, setIsSignUp]=useState(true)
//show dashboard button
const isDashboard=true

// get data from store

const user = useSelector((state) => {
    return state?.users
})
const {isLoggedIn, isRegistered,userAuth}=user;


// force navigation once an action is performed
const navigate=useNavigate();

useEffect(() => {
    if (isRegistered) {
       
      navigate('/onboarding');
      window.location.reload();
    

    }
  }, [isRegistered, navigate])



 

    const authToken = userAuth;
    

    useEffect(()=> {
        if (isLoggedIn){
            return navigate('/dashboard')
        } 
        }, [isLoggedIn, navigate, userAuth])
       
            

   

    const dispatch= useDispatch()
    return (
        <div className='overlay'>
            <Nav setShowModal={setShowModal} authToken={authToken} showModal={showModal} setIsSignUp={setIsSignUp} isDashboard={isDashboard}/>
            <div>
                <div className='home'>
                    <h1 className="primary-title">Get A Pet</h1>
                    <button className='primary-button' onClick={()=> {authToken? dispatch(logout()): setShowModal(true)}}>
                        {authToken ? "Sign out" : "create Account"}
                    </button>
                    {showModal && <Authmodal setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>}
                </div>
            </div>
        </ div>);
};
