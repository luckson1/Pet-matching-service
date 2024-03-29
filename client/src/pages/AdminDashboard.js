import React, { useEffect, useState } from "react";
import { Nav } from "../components/navigation/Nav";
import Adopter from "../components/images/Adopter.jpg";
import Cat from "../components/images/Cat.jpg";
import Dog from "../components/images/Dog.jpg";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonerpetsAction } from "../redux/petsSlices";
import { fetchAllUsersAction } from "../redux/usersSlices";
import { PetOnboarding } from "../components/PetOnboarding";
export const AdminDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDonerpetsAction());
    dispatch(fetchAllUsersAction());
  }, []);

  const [showForm, setShowForm] = useState(false);

  const closeFormHandler = () => {
    setShowForm(false)
  };
  const petsData = useSelector((state) => state?.pets?.donerPets?.pets);

  const usersData = useSelector((state) => state?.users?.allUsers?.users);
  //get ids of Dogs
  const dogs = petsData?.filter((pet) => pet?.petType === "dogs");
  let dogIds = [];
  dogs?.map((dog) => dogIds.push(dog?._id));

  // get ids of Cats
  const cats = petsData?.filter((pet) => pet?.petType === "cats");
  let catIds = [];
  cats?.map((cat) => catIds.push(cat?._id));

  //get ids of Dogs Adopters
  const dogAdopters = usersData?.filter(
    (user) => user?.petPreference === "dogs"
  );
  let dogAdopterIds = [];
  dogAdopters?.map((dogAdopter) => dogAdopterIds.push(dogAdopter?._id));

  //filter ids of Cat Adopters 

  const catAdopters = usersData?.filter(
    (user) => user?.petPreference === "cats"
  );

  let catAdopterIds = [];
  catAdopters?.map((catAdopter) => catAdopterIds.push(catAdopter?._id));


  // filter ids of those with no prefrence
  const noPreferenceAdopters = usersData?.filter(
    (user) => user?.petPreference === "any"
  );

  let noPreferenceAdopterIds = [];
  noPreferenceAdopters?.map((adopter) =>
    noPreferenceAdopterIds.push(adopter?._id)
  );
  const isEdit=true
  return (
    <section>
      <Nav />
      <div className=" flex flex-row justify-end my-5  mx-24 lg:mx-48 mt-24">
        <button
          className=" bg-gradient-to-r from-green-500 via-emerald-200 to-teal-500 text-gray-900 font-bold rounded-lg py-1 px-1 md:py-2 md:px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out animate-bounce"
          onClick={() => setShowForm(true)}
        >
          Add Pet
        </button>
      </div>
      <div className="mt-10 mb-5 mx-20 flex flex-row flex-wrap justify-center  gap-5 ">
        <AdminDashboardCard
          src={Adopter}
          title={`${dogAdopters?.length} Adopters Looking for a Dog`}
          buttonText={"View"}
          redirectionUrl={"/adopters"}
          state={dogAdopterIds}
        />
        <AdminDashboardCard
          src={Adopter}
          title={`${catAdopters?.length} Adopters Looking for a Cat`}
          buttonText={"View"}
          redirectionUrl={"/adopters"}
          state={catAdopterIds}
        />
        <AdminDashboardCard
          src={Adopter}
          title={`${noPreferenceAdopters?.length} Adopters Without Particular Preference`}
          buttonText={"View"}
          redirectionUrl={"/adopters"}
          state={noPreferenceAdopterIds}
        />
        <AdminDashboardCard
          src={Dog}
          title={`${dogs?.length} Dogs You have put on Adoption`}
          buttonText={"View"}
          redirectionUrl={"/all-Pets"}
          state={dogIds}
          editPet="allowed"
        />
        <AdminDashboardCard
          src={Cat}
          title={`${cats?.length} Cats You Have Put on Adoption`}
          buttonText={"View"}
          redirectionUrl={"/all-Pets"}
          state={catIds}
          editPet="allowed"
        />
      </div>
      {showForm && (
            <PetOnboarding
              closeFormHandler={closeFormHandler}
            />
          )}
    </section>
  );
};
