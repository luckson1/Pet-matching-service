import React from 'react';
export const PetProfile = ({ pet }) => {

    return (
        <div className='pet'>
            <div className='pet-header'>
                <h4>{pet?.name} {pet?.age} year old,  {pet?.gender} {pet?.breed} Breed</h4>
            </div>
            <div className='pet-details'>
                <p><i class="bi bi-emoji-smile"></i> {pet?.children === "yes" ? "I am friendly to kinds below 8 years" : "I have not been socialised with kids in the past"}</p>
                <p><i class="bi bi-emoji-smile"></i> {pet?.active === "yes" ? "I am  adventurerous and love playing a lot " : "I am a laid back pet.I may not be playful but I love talking walks"}</p>
                <p><i class="bi bi-emoji-smile"></i> {pet?.petTorrelance === "none" ? "I am not good with other pets"
                    : pet?.petTorrelance === "both" ? "I can comfortably live with both cats and dogs"
                        : `I am fine living with only ${pet?.petTorrelance}`}</p>
                <p><i class="bi bi-emoji-smile"></i> {pet?.garden === "yes" ? "My ideal home is the one with a secure compound with access to a garden" : "I don't require access to a garden but having one would be great"}</p>

            </div>
            <div className='pet-background'>
                <h4>Backgroud: </h4>
                <p> {pet?.about}</p>
            </div>


        </div>);
};
