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

  const dogs = petsData?.filter((pet) => pet?.petType === "dogs");
  const cats = petsData?.filter((pet) => pet?.petType === "cats");
  const dogAdopters = usersData?.filter(
    (user) => user?.petPreference === "dogs"
  );
  const catAdopters = usersData?.filter(
    (user) => user?.petPreference === "cats"
  );
  const noPreferenceAdopters = usersData?.filter(
    (user) => user?.petPreference === "any"
  );
  console.log(catAdopters);
  return (
    <section>
      <Nav />
      <div className="mt-24 mb-5 mx-20 flex flex-row flex-wrap justify-center md:justify-between gap-1 ">
        <AdminDashboardCard
          src={Adopter}
          title={`${dogAdopters?.length} Adopters Looking for a Dog`}
          buttonText={"View"}
          redirection={"/adopters"}
        />
        <AdminDashboardCard
          src={Adopter}
          title={`${catAdopters?.length} Adopters Looking for a Cat`}
          buttonText={"View"}
          redirection={"/adopters"}
        />
        <AdminDashboardCard
          src={Adopter}
          title={`${noPreferenceAdopters?.length} Adopters Without Particular Preference`}
          buttonText={"View"}
          redirection={"/adopters"}
        />
        <AdminDashboardCard
          src={Dog}
          title={`${dogs?.length} Dogs Available for Adoption`}
          buttonText={"View"}
          redirection={"/all-Pets"}
        />
        <AdminDashboardCard
          src={Cat}
          title={`${cats?.length} Cats Available for Adoption`}
          buttonText={"View"}
          redirection={"/all-Pets"}
        />
      </div>
    </section>
  );
};
