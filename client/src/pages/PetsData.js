import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Nav } from "../components/navigation/Nav";
import PetsList from "../components/PetsList";
import { fetchAllpetsAction } from "../redux/petsSlices";

function PetsData() {
  const [pets, setpets] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedPetsIds = location?.state;
  useEffect(() => {
    dispatch(fetchAllpetsAction());
  }, []);

  const petsData = useSelector((state) => state?.pets?.allPets?.pets);

  useEffect(() => {
    if (typeof petsData !== "undefined" && selectedPetsIds === null)
      setpets(petsData);
    if (typeof petsData !== "undefined" && selectedPetsIds !== null) {
      // filter pets selected by a user as their favourite or based on type of pet
      let filteredPets = petsData?.filter((pet) =>
        selectedPetsIds?.includes(pet?._id)
      );
     
      setpets(filteredPets);
    }
  }, [petsData]);

  return (
    <div>
      <Nav />

      <div className="mt-24  p-5">
        <PetsList pets={pets} setPets={setpets} />
      </div>
    </div>
  );
}

export default PetsData;
