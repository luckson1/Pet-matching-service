import React from 'react';
import { PetProfile } from './PetProfile';
export const PetProfileModal = ({setShowModal, pet}) => {
    return(
        <div className='auth-modal'>
        <div onClick={() => { setShowModal(false)}} onTouchStart={() => { setShowModal(false) }}className="close-icon"><i className="bi bi-file-excel"></i></div>
        <PetProfile pet={pet}/>
        </div>
    );
};
