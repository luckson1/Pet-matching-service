import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ErrorDisplayMessage from "../components/ErrorDisplayMessage";
import FavouritePetsMatched from "../components/FavouritePetsMatched";
import LoadingComponent from "../components/LoadingSpinner";
import { Nav } from "../components/navigation/Nav";
import { fetchMatchedPetsAction } from "../redux/petsSlices";

export const FavouritePets = () => {
  //access location data
  const location = useLocation();
  const state = location?.state?.petMatches;
  // dispatch action to fetch
  const dispatch = useDispatch();

  useEffect(() => {
    const user = state;
    dispatch(fetchMatchedPetsAction(user));
  }, [dispatch, state]);

  //get state from store

  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  const petsState = useSelector((state) => state?.pets);
  const { petLoading, petsMatched, petServerErr, petAppErr } = petsState;

  return (
    <>
      <Nav authToken={userAuth} />
      <div className="mt-20 md:mx-10">
        {petLoading ? (
          <LoadingComponent />
        ) : petServerErr || petAppErr ? (
          <ErrorDisplayMessage>Error</ErrorDisplayMessage>
        ) : petsMatched?.length === 0 ? (
          <>
            <h3>No Pets to display</h3>
            <h4 className="text-blue-500 mt-7 underline">
              <Link to="/dashboard">Back to Dashboard</Link>
            </h4>
          </>
        ) : (
          <>
            <div className="heading">
              <h4>
                These are Your Favourite. Click on the image for more
                information.
              </h4>
              <h4 className="text-blue-500 mt-7 underline">
                <Link to="/dashboard">Back to Dashboard</Link>
              </h4>
            </div>
            <div className="bg-white m-10 p-5 rounded h-full ">
              <FavouritePetsMatched petsMatched={petsMatched} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
