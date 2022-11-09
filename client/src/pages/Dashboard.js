import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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
  const [removedPet, setRemovedPet] = useState();
  const [selectedPet, setSelectedPet] = useState();

  const dispatch = useDispatch();
  const navigate=useNavigate()


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
const lastCard= {_id:"123", name: "Last Card"}
const petsCards=pets? [lastCard, ...pets]: null;
  const isOnboarded = userProfile?.user?.petPreference;
  const isAdmin = userProfile?.user?.isAdmin;


  let showInfo = "";
  const outOfFrame = function (name) {
    setRemovedPet(name);
  };
  const swiped = function (direction, pet) {
    setLastDirection(direction);


    // call action to update matches when one swipes right
    if (direction === "right") {
      return dispatch(updateMatchesAction(pet));
    }
  };

  const showInfoFunc = () => {
    showInfo =
      lastDirection === "right"
        ? removedPet + " was added to favourites"
        : lastDirection === "left"
        ? removedPet + " left the screen"
        : lastDirection === "up"
        ? removedPet + " left the screen"
        : lastDirection === "down"
        ? removedPet + " left the screen"
        : "";
    return showInfo;
  }; // fetch prefered pets
  const swipeAction= showInfoFunc();

  return (
    <>
      <Nav authToken />
      <div className="md:mx-20 mt-16 ">
        <div className="w-11/12 fixed justify-center text-xs md:text-lg">
          {isAdmin || isOnboarded ? (
            <p >
              Swipe Right to add a Pet to Favourites, or Left to Remove it from
              Dashboard
            </p>
          ) : (
            <p>
              Please complete the{" "}
              <a href="/onboarding" className="text-blue-500">
                registration process
              </a>
            </p>
          )}
          <div className="mt-2 text-blue-600">
            {removedPet && swipeAction}
          </div>
        </div>
        {showModal && (
                  <PetProfileModal
                    setShowModal={setShowModal}
                    pet={selectedPet}
                  />
                )}
        {/* Errors */}
        {petAppErr || petServerErr ? (
          <div className="form-validation" role="alert">
            {petServerErr} {petAppErr}
          </div>
        ) : null}
   
        {petLoading ? (
          <LoadingComponent />
        ) : (
          petsCards?.map((pet) => (
            <TinderCard
              className="swipe"
              key={pet._id}
              onSwipe={(dir) => swiped(dir, pet)}
              onCardLeftScreen={() => outOfFrame(pet.name)}
            >
              <div className="dashboard mt-24">
                <div className="pet-header-small-screen">
                 {pet?.name !=="Last Card" && <button
                    className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-900 font-bold rounded-full  w-48 py-2  shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedPet(pet)
                    }}
                    onTouchStart={() => {
                      setShowModal(true);
                      setSelectedPet(pet)
                    }}
                  >
                    {pet?.name}'s Profile
                  </button>}
                  {pet?.name ==="Last Card" && <button
                    className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-900 font-bold rounded-full  w-48 py-2  shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    onClick={() => {
                  navigate("/favourite-pets")
                    }}
                    onTouchStart={() => {
                      navigate("/favourite-pets")
                    }}
                  >
                   Favourites
                  </button>}
                </div>
             
     
                <div className="swiper-container">
                  <div className="card-container" key={pet._id}>
                    <div
                      style={{ backgroundImage: "url(" + pet.image + ")" }}
                      className="card"
                    >
                     {pet?.name=== "Last Card"? <h2>Congratulations! You're all caught up! <Link to="/favourite-pets" className="text-blue-500 underline" onTouchStart={()=> navigate("/favourite-pets")}>View your favourite pets</Link></h2>: <h3>{pet.name}</h3>}
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
