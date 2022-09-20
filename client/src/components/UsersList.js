import React from "react";
import { useNavigate } from "react-router";
import Cat  from "../components/images/Cat.jpg"

function UsersList({users}) {

const navigate= useNavigate()
  return (
    <div className="table text-left">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1 text-left">Avatar</div>
          <div className="col col-2 text-left" >Name</div>
          <div className="col col-4 text-left" >Email</div>
          <div className="col col-3 text-left">Favourites</div>
          <div className="col col-5 text-left">Status</div>
          <div className="col col-1 text-left">Preference</div>
        </li>

        {users?.map((user) => (
          <li className="table-row" key={user?._id}>
            <div className="col col-1" data-label="Avatar">
              <img
                alt="profile iimage"
                src={user?.image?? Cat}
                className="rounded-full h-6 w-6 ml-5"
              />
            </div>
            <div className="col col-4 text-left" data-label="Name">
              {user?.firstName }  {user?.lastName}
            </div>
            <div className="col col-2 text-left" data-label="Email">
              {user?.email}
            </div>
            <div className="col col-3" data-label="Role" onClick={()=> navigate("/all-pets", {state :user?.petMatches})}>
            <button className="py-1 px-7 bg-cyan-200 rounded-lg"> {user?.petMatches?.length}</button>
            </div>
            <div className="col col-5" data-label="Status">
              {user?.status ?? "Pending"}
            </div>
            <div className="col col-1" data-label="Preference">
              {user?.petPreference}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
