import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TinderCard from 'react-tinder-card'
import LoadingComponent from '../components/LoadingSpinner';

import { Nav } from '../components/navigation/Nav';
import { Nav2 } from '../components/navigation/Nav2';
import { PetProfile } from '../components/PetProfile';
import { PetProfileModal } from '../components/PetProfileModal';



import { fetchPetsAction } from '../redux/petsSlices';
import { updateMatchesAction } from '../redux/usersSlices';





export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [lastDirection, setLastDirection] = useState()
  const dispatch = useDispatch()
  console.log(showModal)
  const swiped = (direction, pet) => {
    console.log(direction)
    setLastDirection(direction);
    // call action to update matches when one swipes right
    if (direction === "right") { return dispatch(updateMatchesAction(pet)) }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  // get state from the store
  const user = useSelector((state) => {
    return state?.users
  })

  const petsState = useSelector((state) => {
    return state?.pets
  })

  const { petsFetched, petLoading } = petsState
  const pets = petsFetched

  const { userAuth } = user;
  const authToken = userAuth;



  // fetch prefered pets

  useEffect(() => {
    dispatch(fetchPetsAction())
  }, [dispatch])

  //show Favourite Pets button
  const isFavPets = true
  const isAdmin = userAuth?.user?.isAdmin

  return (
    <>
      {isAdmin ? <Nav2 authToken={authToken} /> : <Nav authToken={authToken} isFavPets={isFavPets} />}
      <div className='info'>
        <h4>Swipe Right to add a Pet to Favourites, or Left to Remove it from Dashboard</h4>
      </div>
      {petLoading ? <LoadingComponent /> : pets?.map((pet) =>
        <TinderCard
          className='swipe'
          key={pet._id}
          onSwipe={(dir) => swiped(dir, pet)}
          onCardLeftScreen={() => outOfFrame(pet.name)}>

          <div className='dashboard' >

            <div className='pet-container-small-screen'>
              <div className='pet-header-small-screen'>
          
                <button className="primary-button" onClick={() => { setShowModal(true) }} >View Pet Profile</button>
              </div>
            </div>
            {showModal && <PetProfileModal setShowModal={setShowModal} pet={pet}  key={pet._id}/>}
            <div className='pet-container'>

              <PetProfile pet={pet}        key={pet._id}/>
            </div>
            <div className='swiper-container'>

              <div className='card-container'        key={pet._id}>



                <div style={{ backgroundImage: "url(" + pet.image + ")" }} className='card'>
                  <h3>{pet.name}</h3>

                </div>
                <div className='swipe-info'        key={pet._id}>
                  {lastDirection === "right" ? <p>Pet added to favourites</p> : lastDirection === "left" ? <p>Pet removed from the dashboard</p> : null}
                </div>


              </div>

            </div>

          </div>
        </TinderCard>)}
    </>);
};
