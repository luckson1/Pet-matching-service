import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
    //check if user is login in
  // const userLogin = useSelector(state => state?.users?.userAuth);
  //check if user is an admin
  const userAdmin = useSelector(state => state?.users?.userAuth?.isAdmin)
  return userAdmin? children: <Navigate to='/not-admin' />
};

export default AdminRoute;