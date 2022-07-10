import React from 'react';
import { PetProfile } from './PetProfile';
export const PetProfileModal = ({setShowModal, pet}) => {
    return(
        <div className='auth-modal'>
        <div onClick={() => { setShowModal(false)}} onTouchStart={() => { setShowModal(false) }}className="close-icon nav-button"><i className="bi bi-x-circle-fill" style={{color: "red"}}></i></div>
        <PetProfile pet={pet}/>
        </div>
    );
};
