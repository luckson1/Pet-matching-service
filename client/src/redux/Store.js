
import {configureStore} from "@reduxjs/toolkit";
import userReducers from "./usersSlices";
import petReducers from "./petsSlices";


const Store=configureStore( {
    reducer: { 
        users: userReducers,
        pets: petReducers,
        
    }
});



export default Store;