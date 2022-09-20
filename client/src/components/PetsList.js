import React, { useState } from "react";
import Cat from "../components/images/Cat.jpg";
import { PetProfileModal } from "./PetProfileModal";

function PetsList({ pets }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState([]);
  return (
    <div className="table text-left z-0">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1 text-left">Avatar</div>
          <div className="col col-2 text-left">Name</div>
          <div className="col col-1 text-left">Type</div>
          <div className="col col-3 text-left">Gender</div>
          <div className="col col-5 text-left">Breed</div>
        </li>

        {pets?.map((pet) => (
          <li
            className="table-row cursor-pointer"
            key={pet?._id}
            onClick={() => {
              setShowModal(true);
              setSelectedPet(pet);
            }}
          >
            <div className="col col-1" data-label="Avatar">
              <img
                alt="profile iimage"
                src={pet?.image ?? Cat}
                className="rounded-full h-6 w-6 ml-5"
              />
            </div>
            <div className="col col-4 text-left" data-label="Name">
              {pet?.name}
            </div>
            <div className="col col-1 text-left" data-label="type">
              {pet?.petType}
            </div>
            <div className="col col-3" data-label="Gender">
              {pet?.gender}
            </div>
            <div className="col col-5" data-label="Breed">
              {pet?.breed ?? "Unkown"}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-48">
        {showModal && (
          <PetProfileModal
            setShowModal={setShowModal}
            pet={selectedPet}
            key={selectedPet._id}
          />
        )}
      </div>
    </div>
  );
}

export default PetsList;
