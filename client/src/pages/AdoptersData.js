import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
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
      <div className="mb-10 underline text-blue-500 hover:text-blue-900 flex flex-row justify-end mx-44">
        <Link to="/admin-dashboard">Back to Admin</Link>
        </div>
        <UsersList users={adopters} />
      </div>
    </div>
  );
}

export default AdoptersData;
