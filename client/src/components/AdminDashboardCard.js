import React from "react";
import { useNavigate } from "react-router";

export default function AdminDashboardCard({
  src,
  title,
  redirectionUrl,
  buttonText,
  state,
}) {
  const navigate = useNavigate();
  return (
    <div className="h-64 w-64 bg-indigo-100 rounded-lg shadow-lg flex flex-col justify-between items-center py-7 mb-7">
      <img src={src} alt="placeHolder" className="h-12 w-12 rounded-full" />
      <p className="w-56 text-left">{title}</p>
      <button
        className=" bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-gray-900 font-bold rounded-lg w-24 h-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        onClick={() => navigate(redirectionUrl, (state = { state }))}
      >
        {buttonText}
      </button>
    </div>
  );
}
