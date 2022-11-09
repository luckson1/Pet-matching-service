import React from "react";
import { useDispatch } from "react-redux";
import { deletepetAction } from "../redux/petsSlices";
function DeleteDialogBox({pet, pets, setPets, setShowDeleteModal}) {
  // dispatch action to delete task
  const dispatch = useDispatch();
  

  const deleteTaskHandler = () => {
dispatch(deletepetAction(pet));
const newList= pets?.filter(p=> p?._id !== pet?._id)  
setPets(newList)
setShowDeleteModal(false)
 
  };

  return (
    <div>
      <div className="delete-modal">
        <div className="modalContent">
          <span
            className="close"
     onClick={()=> setShowDeleteModal(false)}
          >
            ×
          </span>
          <p>Are you sure you want to delete this Pet</p>
          <button className="del" onClick={() => deleteTaskHandler()}>
            Delete Pet
          </button>
          <button className="cancel" 
           onClick={()=> setShowDeleteModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialogBox;
