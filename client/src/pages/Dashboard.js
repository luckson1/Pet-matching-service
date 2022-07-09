import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TinderCard from 'react-tinder-card'
import LoadingComponent from '../components/LoadingSpinner';

import { Nav } from '../components/navigation/Nav';
import { Nav2 } from '../components/navigation/Nav2';



import { fetchPetsAction } from '../redux/petsSlices';
import { updateMatchesAction } from '../redux/usersSlices';





export const Dashboard = () => {

  const [lastDirection, setLastDirection] = useState()
  const dispatch= useDispatch()

  const swiped = (direction, pet) => {
    console.log(direction)
    setLastDirection(direction);
    // call action to update matches when one swipes right
if (direction==="right") { return dispatch(updateMatchesAction(pet))}
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

  const {petsFetched, petLoading}= petsState
  const pets= petsFetched

  const { userAuth } = user;
  const authToken = userAuth;



  // fetch prefered pets

  useEffect(() => {
    dispatch(fetchPetsAction())
  }, [dispatch])

//show Favourite Pets button
const isFavPets=true
const isAdmin=userAuth?.user?.isAdmin
  return (
    <>
    { isAdmin?   <Nav2 authToken={authToken} />: <Nav authToken={authToken} isFavPets={isFavPets}/>}
      <div className='info'>
                <h4>Swipe Right to add a Pet to Favourites, or Left to Remove it from Dashboard</h4>
              </div>
      {petLoading? <LoadingComponent />: pets?.map((pet) =>
        <TinderCard
          className='swipe'
          key={pet.id}
          onSwipe={(dir) => swiped(dir, pet)}
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
                  {lastDirection=== "right" ? <p>You added {pet?.name} to favourites</p> :  <p>You removed {pet?.name} from the dashboard</p> }
                </div>


              </div>

            </div>
          </div>
        </TinderCard>)}
    </>);
};
