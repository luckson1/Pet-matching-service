import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "../components/navigation/Nav";
import UsersList from "../components/UsersList";
import { fetchAllUsersAction } from "../redux/usersSlices";


function AdoptersData() {
 
const [adopters, setAdopters]= useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, []);

  const usersData = useSelector((state) => state?.users?.allUsers?.users);

 
  useEffect(() => {
    if (typeof usersData !== "undefined") setAdopters(usersData);
  }, [usersData]);

  return (
    <div>
     <Nav />
      <div className="mt-28">
        <UsersList users={adopters}/>
      </div>
    </div>
  );
}

export default AdoptersData;
