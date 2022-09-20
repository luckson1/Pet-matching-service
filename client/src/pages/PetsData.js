import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Nav } from "../components/navigation/Nav";
import PetsList from "../components/PetsList";
import { fetchAllpetsAction } from "../redux/petsSlices";



function PetsData() {
 
const [pets, setpets]= useState([])
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const location= useLocation()
  const usersPetsIds=location?.state

  useEffect(() => {
    dispatch(fetchAllpetsAction());
  }, []);

  const petsData = useSelector((state) => state?.pets?.allPets?.pets);
 

  useEffect(() => {
    if (typeof petsData !== "undefined" && usersPetsIds ===null) setpets(petsData);
    if (typeof petsData !== "undefined" && usersPetsIds !==null) {
      // filter pets selected by a user as their favourites
      let favouritePets=petsData?.filter(pet=> usersPetsIds?.includes(pet?._id))
      console.log(favouritePets)
        setpets(favouritePets);}
  }, [petsData]);

  return (
    <div>
        <Nav />
     
      <div className="mt-24 flex flex-col p-5">
        <div className=" flex flex-row justify-end my-5  mx-24 lg:mx-48">
        <button className=" bg-gradient-to-r from-green-500 via-emerald-200 to-teal-500 text-gray-900 font-bold rounded-lg py-1 px-1 md:py-2 md:px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out animate-bounce"
        onClick={()=> navigate("/pet-onboarding")}>
            Add Pet</button>
        </div>
        <PetsList pets={pets}/>
      </div>
    </div>
  );
}

export default PetsData;