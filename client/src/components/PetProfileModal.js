import React from "react";
import { PetProfile } from "./PetProfile";
export const PetProfileModal = ({ setShowModal, pet }) => {
  return (
    <div className="bg-half-transparent  fixed nav-item top-0 right-0 z-50 fixed-modal">
      <div className="pet-modal mt-10">
        <div
         onClick={() => {
          setShowModal(false);
        }}
        onTouchStart={() => {
          setShowModal(false);
        }}
          className="close-icon animate-spin "
        >
          <i className="bi bi-x-circle-fill" style={{ color: "red" }}></i>
        </div>
        <PetProfile pet={pet} />
      </div>
    </div>
  );
};
