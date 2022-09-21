import React, { useEffect } from "react";
import { Nav } from "../components/navigation/Nav";
import Adopter from "../components/images/Adopter.jpg";
import Cat from "../components/images/Cat.jpg";
import Dog from "../components/images/Dog.jpg";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllpetsAction } from "../redux/petsSlices";
import { fetchAllUsersAction } from "../redux/usersSlices";
export const AdminDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllpetsAction());
    dispatch(fetchAllUsersAction());
  }, []);

  const petsData = useSelector((state) => state?.pets?.allPets?.pets);

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
  return (
    <section>
      <Nav />
      <div className="mt-24 mb-5 mx-20 flex flex-row flex-wrap justify-center  gap-5 ">
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
          title={`${dogs?.length} Dogs Available for Adoption`}
          buttonText={"View"}
          redirectionUrl={"/all-Pets"}
          state={dogIds}
        />
        <AdminDashboardCard
          src={Cat}
          title={`${cats?.length} Cats Available for Adoption`}
          buttonText={"View"}
          redirectionUrl={"/all-Pets"}
          state={catIds}
        />
      </div>
    </section>
  );
};
