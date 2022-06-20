import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TinderCard from 'react-tinder-card'

import { Nav } from '../components/Nav';

import { fetchPetsAction } from '../redux/petsSlices';





export const Dashboard = () => {

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  // get state from the store
  const user = useSelector((state) => {
    return state?.users
  })

  const pets = useSelector((state) => {
    return state?.pets?.petsFetched
  })

  const { userAuth } = user;
  const authToken = userAuth;

  const dispach = useDispatch()

  // fetch prefered pets

  useEffect(() => {
    dispach(fetchPetsAction())
  }, [dispach])
  return (
    <>
      <Nav authToken={authToken} />
      {pets?.map((pet) =>
        <TinderCard
          className='swipe'
          key={pet.name}
          onSwipe={(dir) => swiped(dir, pet.name)}
          onCardLeftScreen={() => outOfFrame(pet.name)}>

          <div className='dashboard' >
            <div className='pet-container'>
              <div className='pet'>
                <div className='pet-header'>
                  <h4>{pet?.name} {pet?.age} year old </h4>
                  <h4> {pet?.gender} {pet?.breed} Breed</h4>

                </div>
                <div className='pet-details'>
                  <p><i class="bi bi-emoji-smile"></i> {pet?.children === "yes" ? "I am friendly to kinds below 8 years" : "I have not been socialised with kids in the past"}</p>
                  <p><i class="bi bi-emoji-smile"></i> {pet?.active === "yes" ? "I am  adventurerous and love playing a lot " : "I am a laid back dog.I may not be playful but I love talking walks"}</p>
                  <p><i class="bi bi-emoji-smile"></i> {pet?.petTorrelance === "none" ? "I am not good with other pets"
                    : pet?.petTorrelance === "both" ? "I can comfortably live with both cats and dogs"
                    : `I am fine living with only ${pet?.petTorrelance}`}</p>
                  <p><i class="bi bi-emoji-smile"></i> {pet?.garden==="yes"? "My ideal home is the one with a secure compound with access to a garden": "I don't require access to a garden but having one would be great"}</p>

                </div>
                <div className='pet-background'>
                  <h4>Backgroud: </h4>
                  <p> {pet?.about}</p>
                </div>

              </div>
            </div>
            <div className='swiper-container'>
              <div className='card-container'>



                <div style={{ backgroundImage: "url(" + pet.image + ")" }} className='card'>
                  <h3>{pet.name}</h3>
                </div>
                <div className='swipe-info'>
                  {lastDirection ? <p>You swiped {lastDirection}</p> : null}
                </div>


              </div>

            </div>
          </div>
        </TinderCard>)}
    </>);
};
