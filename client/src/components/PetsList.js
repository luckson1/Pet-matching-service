import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Cat from "../components/images/Cat.jpg";
import DeleteDialogBox from "./DeleteDialogBox";
import { PetOnboarding } from "./PetOnboarding";
import { PetProfileModal } from "./PetProfileModal";

function PetsList({ pets, setPets }) {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPet, setSelectedPet] = useState([]);
  return (
    <>
      <div className=" flex flex-row justify-end my-5  mx-24 lg:mx-48">
        <button
          className=" bg-gradient-to-r from-green-500 via-emerald-200 to-teal-500 text-gray-900 font-bold rounded-lg py-1 px-1 md:py-2 md:px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out animate-bounce"
          onClick={() => setShowForm(true)}
        >
          Add Pet
        </button>
      </div>
      <div className="table text-left z-0">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1 text-left">Avatar</div>
            <div className="col col-1 text-left">Name</div>
            <div className="col col-1 text-left">Type</div>
            <div className="col col-3 text-left">Gender</div>
            <div className="col col-3 text-left">Breed</div>
            <div className="col col-4 text-left">Actions</div>
          </li>

          {pets?.map((pet) => (
            <li className="table-row " key={pet?._id}>
              <div className="col col-1" data-label="Avatar">
                <img
                  alt="profile iimage"
                  src={pet?.image ?? Cat}
                  className="rounded-full h-6 w-6 ml-5"
                />
              </div>
              <div className="col col-1 text-left" data-label="Name">
                <button
                  className="py-1 w-16 rounded-3xl bg-indigo-300 cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedPet(pet);
                  }}
                >
                  {pet?.name}
                </button>
              </div>
              <div className="col col-1 text-left" data-label="type">
                {pet?.petType}
              </div>
              <div className="col col-3" data-label="Gender">
                {pet?.gender}
              </div>
              <div className="col col-3" data-label="Breed">
                {pet?.breed ?? "Unkown"}
              </div>
              <div
                className="col col-4 flex flex-row gap-5 cursor-pointer"
                data-label="Breed"
              >
                <BiEdit
                  color="orange"
                  size={"20px"}
                  onClick={() => {
                    setIsEdit(true);
                    setShowForm(true);
                    setSelectedPet(pet);
                  }}
                />
                <MdDeleteForever
                  color="red"
                  size={"20px"}
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedPet(pet);
                  }}
                />
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
          {showForm && (
            <PetOnboarding
              setShowForm={setShowForm}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              setPets={setPets}
              pets={pets}
              pet={selectedPet}
            />
          )}
          {showDeleteModal && (
            <DeleteDialogBox
              setShowDeleteModal={setShowDeleteModal}
              setPets={setPets}
              pets={pets}
              pet={selectedPet}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PetsList;
