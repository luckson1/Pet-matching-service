import React from "react";
import { Link } from "react-router-dom";
import success from "../components/images/success.svg";
const RegistrationSuccess = () => {
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
      <h1 className="text-danger">Account Successfully Created</h1>
      <div className="mb-10 underline text-blue-500 hover:text-blue-900 flex flex-row justify-end mx-44">
        <Link to="/">Login to Continue</Link>
        </div>
      <img alt="success" className=" img-fluid m-3" src={success} />
    </div>
  );
};

export default  RegistrationSuccess;