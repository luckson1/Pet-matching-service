import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from "react-tinder-card";
import LoadingComponent from "../components/LoadingSpinner";

import { Nav } from "../components/navigation/Nav";
import { PetProfileModal } from "../components/PetProfileModal";

import { fetchPetsAction } from "../redux/petsSlices";
import {
  fetchUserProfileAction,
  updateMatchesAction,
} from "../redux/usersSlices";

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [lastDirection, setLastDirection] = useState();
  const [currentPet, setCurrentPet] = useState();
  const dispatch = useDispatch();

  const swiped = function (direction, pet) {
    setLastDirection(direction);
    console.log(direction);
    // call action to update matches when one swipes right
    if (direction === "right") {
      return dispatch(updateMatchesAction(pet));
    }
  };
  let showInfo = "";
  const outOfFrame = function (name) {
    setCurrentPet(name);
    console.log(name + " left the screen!");
  };

  const showInfoFunc = () => {
    showInfo =
      lastDirection === "right"
        ? currentPet + " was added to favourites"
        : lastDirection === "left"
        ? currentPet + " left the screen"
        : lastDirection === "up"
        ? currentPet + " left the screen"
        : lastDirection === "down"
        ? currentPet + " left the screen"
        : "";
    return showInfo;
  }; // fetch prefered pets
  const swipeAction= showInfoFunc();
  useEffect(() => {
    dispatch(fetchPetsAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUserProfileAction());
  }, [dispatch]);

  // get state from the store
  const user = useSelector((state) => {
    return state?.users;
  });

  const petsState = useSelector((state) => {
    return state?.pets;
  });

  const { petsFetched, petLoading, petAppErr, petServerErr } = petsState;
  const pets = petsFetched;

  const { userProfile } = user;

  const isOnboarded = userProfile?.user?.petPreference;

  //show Favourite Pets button

  return (
    <>
      <Nav authToken />
      <div className="md:mx-20 mt-16 ">
        <div className="w-11/12 fixed justify-center">
          {isOnboarded ? (
            <h4>
              Swipe Right to add a Pet to Favourites, or Left to Remove it from
              Dashboard
            </h4>
          ) : (
            <p>
              Please complete the{" "}
              <a href="/onboarding" className="text-blue-500">
                registration process
              </a>
            </p>
          )}
          <div className="mt-2 text-blue-600">
            {currentPet && swipeAction}
          </div>
        </div>
        {/* Errors */}
        {petAppErr || petServerErr ? (
          <div className="form-validation" role="alert">
            {petServerErr} {petAppErr}
          </div>
        ) : null}
   
        {petLoading ? (
          <LoadingComponent />
        ) : (
          pets?.map((pet) => (
            <TinderCard
              className="swipe"
              key={pet._id}
              onSwipe={(dir) => swiped(dir, pet)}
              onCardLeftScreen={() => outOfFrame(pet.name)}
            >
              <div className="dashboard mt-20">
                <div className="pet-header-small-screen">
                  <button
                    className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-900 font-bold rounded-full mb-4 w-48 py-2  shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    onClick={() => {
                      setShowModal(true);
                    }}
                    onTouchStart={() => {
                      setShowModal(true);
                    }}
                  >
                    {pet?.name}'s Profile
                  </button>
                </div>
                {showModal && (
                  <PetProfileModal
                    setShowModal={setShowModal}
                    pet={pet}
                    key={pet._id}
                  />
                )}
                {/* <div className='pet-container'>

              <PetProfile pet={pet} key={pet._id} />
            </div> */}
                <div className="swiper-container">
                  <div className="card-container" key={pet._id}>
                    <div
                      style={{ backgroundImage: "url(" + pet.image + ")" }}
                      className="card"
                    >
                      <h3>{pet.name}</h3>
                    </div>
                  </div>
                  
                </div>
                
              </div>
              
            </TinderCard>
          ))
        )}
        </div>
    
    </>
  );
};
