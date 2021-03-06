import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TinderCard from 'react-tinder-card'
import LoadingComponent from '../components/LoadingSpinner';

import { Nav } from '../components/navigation/Nav';
import { Nav2 } from '../components/navigation/Nav2';
import { PetProfile } from '../components/PetProfile';
import { PetProfileModal } from '../components/PetProfileModal';



import { fetchPetsAction } from '../redux/petsSlices';
import { fetchUserProfileAction, updateMatchesAction } from '../redux/usersSlices';





export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [lastDirection, setLastDirection] = useState()
  const dispatch = useDispatch()
  const swiped = (direction, pet) => {
    console.log(direction)
    setLastDirection(direction);
    // call action to update matches when one swipes right
    if (direction === "right") { return dispatch(updateMatchesAction(pet)) }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  // fetch prefered pets

  useEffect(() => {
    dispatch(fetchPetsAction())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchUserProfileAction())
  }, [dispatch])

  // get state from the store
  const user = useSelector((state) => {
    return state?.users
  })

  const petsState = useSelector((state) => {
    return state?.pets
  })

  const { petsFetched, petLoading, petAppErr, petServerErr } = petsState
  const pets = petsFetched

  const { userAuth, userProfile } = user;
  const authToken = userAuth;

  const isOnboarded = userProfile?.user?.petPreference





  //show Favourite Pets button
  const isFavPets = true
  const isAdmin = userAuth?.user?.isAdmin

  return (
    <>
      {isAdmin ? <Nav2 authToken={authToken} /> : <Nav authToken={authToken} isFavPets={isFavPets} />}
      <div className='info'>
        {isOnboarded ? <h4>Swipe Right to add a Pet to Favourites, or Left to Remove it from Dashboard</h4> : <p>Please complete the  <a href="/onboarding">registration process</a></p>}
      </div>
      {/* Errors */}
      {petAppErr || petServerErr ? (
        <div className="form-validation" role="alert">
          {petServerErr} {petAppErr}
        </div>
      ) : null}
      {petLoading ? <LoadingComponent /> : pets?.map((pet) =>
        <TinderCard
          className='swipe'
          key={pet._id}
          onSwipe={(dir) => swiped(dir, pet)}
          onCardLeftScreen={() => outOfFrame(pet.name)}>

          <div className='dashboard' >
            <div className='pet-header-small-screen'>

              <button className="primary-button" onClick={() => { setShowModal(true) }} onTouchStart={() => { setShowModal(true) }}>
                View {pet?.name}'s Profile
              </button>
            </div>
            <div className='pet-container-small-screen'>

            </div>
            {showModal && <PetProfileModal setShowModal={setShowModal} pet={pet} key={pet._id} />}
            <div className='pet-container'>

              <PetProfile pet={pet} key={pet._id} />
            </div>
            <div className='swiper-container'>

              <div className='card-container' key={pet._id}>



                <div style={{ backgroundImage: "url(" + pet.image + ")" }} className='card'>
                  <h3>{pet.name}</h3>

                </div>
                <div className='swipe-info' key={pet._id}>
                  {lastDirection === "right" ? <p>Pet added to favourites</p> : lastDirection === "left" ? <p>Pet removed from the dashboard</p> : null}
                </div>


              </div>

            </div>

          </div>
        </TinderCard>)}
    </>);
};
