import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Nav } from "../components/navigation/Nav";
import PetsList from "../components/PetsList";
import { fetchAllpetsAction } from "../redux/petsSlices";

function PetsData() {
  const [pets, setPets] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedPetsIds = location?.state;
  useEffect(() => {
    dispatch(fetchAllpetsAction());
  }, []);

  const petsData = useSelector((state) => state?.pets?.allPets?.pets);

  useEffect(() => {
    if (typeof petsData !== "undefined" && selectedPetsIds === null)
      setPets(petsData);
    if (typeof petsData !== "undefined" && selectedPetsIds !== null) {
      // filter pets selected by a user as their favourite or based on type of pet
      let filteredPets = petsData?.filter((pet) =>
        selectedPetsIds?.includes(pet?._id)
      );
     
      setPets(filteredPets);
    }
  }, [petsData, selectedPetsIds]);

  return (
    <div>
      <Nav />

      <div className="mt-24  p-5">
        <div className="mb-10 underline text-blue-500 hover:text-blue-900 flex flex-row justify-end mx-44">
        <Link to="/admin-dashboard">Back to Admin</Link>
        </div>
        
        <PetsList pets={pets} setPets={setPets} />
      </div>
    </div>
  );
}

export default PetsData;
