import React from "react";
import { Link } from "react-router-dom";
import notAdmin from "./images/notadmin.svg";
const NotAdmin = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px",
      }}
    >
      <h1 className="text-danger">You are not an admin</h1>
      <div className="mb-10 underline text-blue-500 hover:text-blue-900 flex flex-row justify-end mx-44">
        <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      <img alt="NotAdmin" className=" img-fluid m-3" src={notAdmin} />
    </div>
  );
};

export default NotAdmin;