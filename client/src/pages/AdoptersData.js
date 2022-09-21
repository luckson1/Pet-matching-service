import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Nav } from "../components/navigation/Nav";
import UsersList from "../components/UsersList";
import { fetchAllUsersAction } from "../redux/usersSlices";

function AdoptersData() {
  const [adopters, setAdopters] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedAdoptersIds = location?.state;
  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, []);

  const adoptersData = useSelector((state) => state?.users?.allUsers?.users);

  useEffect(() => {
    if (typeof adoptersData !== "undefined" && selectedAdoptersIds === null)
      setAdopters(adoptersData);
    if (typeof adoptersData !== "undefined" && selectedAdoptersIds !== null) {
      // filter adopters based on pereference type
      let filteredAdopters = adoptersData?.filter((adopter) =>
        selectedAdoptersIds?.includes(adopter?._id)
      );

      setAdopters(filteredAdopters);
    }
  }, [adoptersData]);

  return (
    <div>
      <Nav />
      <div className="mt-28">
        <UsersList users={adopters} />
      </div>
    </div>
  );
}

export default AdoptersData;
