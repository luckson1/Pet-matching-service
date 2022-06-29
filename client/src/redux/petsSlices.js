import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../utils/BaseUrl";

// actions for redirect after action is completed
export const resetPetCreated = createAction("pet/created/reset")

export const resetPetUpdated = createAction("pet/updated/reset")
export const resetPetPublished = createAction("pet/publish/reset")
export const resetPetDeleted = createAction("pet/Deleted/reset")
// create Pet action

export const createPetAction = createAsyncThunk(
    "pet/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userToken}`,
            },

        };


        try {
            //make http call here

            const { data } = await axios.post(`${BaseURL}/pets`, payload, config);
            
            dispatch(resetPetCreated())
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });


// action to get one pet into our state


export const fetchpetAction = createAsyncThunk(
    "pet/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
    },

        };


        try {
            //make http call here

            const { data } = await axios.get(`${BaseURL}/pets/${payload?.id}`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

    //get   pets by gender

    export const fetchPetsAction = createAsyncThunk(
        "pets/fetch",
        async (payload, { rejectWithValue, getState, dispatch }) => {
            //get user token from store
            const userToken = getState()?.users?.userAuth?.token;
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    
            };
    
    
            try {
                //make http call here
    
                const { data } = await axios.get(`${BaseURL}/pets`, config);
                return data;
    
            } catch (error) {
                if (!error?.response) {
                    throw error;
                }
                return rejectWithValue(error?.response?.data);
            }
    
    
    
        });
 //get   pets by gender

 export const fetchMatchedPetsAction = createAsyncThunk(
    "matched-pets/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
    },

        };


        try {
            //make http call here

            const { data } = await axios.get(`${BaseURL}/pets/matched`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

  

// edit Pet
export const editPetsAction = createAsyncThunk('pets/update', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const userToken = getState()?.users?.userAuth?.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },

    };


    try {
        //make http call here

        const { data } = await axios.put(`${BaseURL}/pets/${payload?.id}`, payload, config);
        dispatch(resetPetUpdated())
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

export const deletepetAction = createAsyncThunk('pet/delete', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
 
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
 
    };
 
 
     try {
         //make http call here
 
         const { data } = await axios.delete(`${BaseURL}/Pets/${payload?.id}`, config);
        dispatch(resetPetDeleted())
         return data;
     } catch (error) {
         if (!error?.response) {
             throw error;
         }
         return rejectWithValue(error?.response?.data);
     }
 
 
 
 });

// create slices for dispatch

const PetsSlices = createSlice({
    name: 'Pet',
    initialState: {

    },
    extraReducers: (builder) => {
        // create Pet
        // handle pending state
        builder.addCase(createPetAction.pending, (state, action) => {
            state.petLoading = true;
            state.petAppErr = undefined;
            state.petServerErr = undefined;

        });
        builder.addCase(resetPetCreated, (state, action) => {
            state.isPetCreated = true
        })
        //hande success state
        builder.addCase(createPetAction.fulfilled, (state, action) => {
            state.PetCreated = action?.payload;
            state.petLoading = false;
            state.petAppErr = undefined;
            state.petServerErr = undefined;
            state.isPetCreated = false
        });
        //hande rejected state

        builder.addCase(createPetAction.rejected, (state, action) => {
            state.petLoading = false;
            state.petAppErr = action?.payload?.msg;
            state.petServerErr = action?.error?.msg;
        })


        // fetch one Pet
        //handle pending state
        builder.addCase(fetchpetAction.pending, (state, action) => {
            state.petLoading = true;
            state.petAppErr = undefined;
            state.petServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchpetAction.fulfilled, (state, action) => {
            state.PetCreated = action?.payload;
            state.petLoading = false;
            state.petAppErr = undefined;
            state.petServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchpetAction.rejected, (state, action) => {
            state.petLoading = false;
            state.petAppErr = action?.payload?.msg;
            state.petServerErr = action?.error?.msg;
        })


        //  fetch all pet pets by gender
        //handle pending state
        builder.addCase(fetchPetsAction.pending, (state, action) => {
            state.petLoading = true;
            state.petAppErr = undefined;
            state.petServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchPetsAction.fulfilled, (state, action) => {
            state.petsFetched = action?.payload;
            state.petLoading = false;
            state.petAppErr = undefined;
            state.petServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchPetsAction.rejected, (state, action) => {
            state.petLoading = false;
            state.petAppErr = action?.payload?.msg;
            state.petServerErr = action?.error?.msg;
        })
//fetch matched pets
        //handle pending state
        builder.addCase(fetchMatchedPetsAction.pending, (state, action) => {
            state.petLoading = true;
            state.petAppErr = undefined;
            state.petServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchMatchedPetsAction.fulfilled, (state, action) => {
            state.petsMatched = action?.payload;
            state.petLoading = false;
            state.petAppErr = undefined;
            state.petServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchMatchedPetsAction.rejected, (state, action) => {
            state.petLoading = false;
            state.petAppErr = action?.payload?.msg;
            state.petServerErr = action?.error?.msg;
        })


        
        // edit a pet

         //handle pending state
         builder.addCase(editPetsAction.pending, (state, action) => {
            state.editpetLoading = true;
            state.editpetAppErr = undefined;
            state.editpetServerErr = undefined;

        })
        
        builder.addCase(resetPetUpdated, (state, action) => {
            state.isPetUpdated = true})
        //hande success state
        builder.addCase(editPetsAction.fulfilled, (state, action) => {
            state.editPetCreated = action?.payload;
            state.editpetLoading = false;
            state.editpetAppErr = undefined;
            state.editpetServerErr = undefined;
            state.isPetUpdated = false
            
        });
        //hande rejected state

        builder.addCase(editPetsAction.rejected, (state, action) => {
            state.editpetLoading = false;
            state.editpetAppErr = action?.payload?.msg;
            state.editpetServerErr = action?.error?.msg;
        })

                //delete  an pet -action

         // delete a pet
        //handle pending state
        builder.addCase(deletepetAction.pending, (state, action) => {
            state.deletepetLoading = true;
            state.deletepetAppErr = undefined;
            state.deletePeterverErr = undefined;

        });
        builder.addCase(resetPetDeleted, (state, action) => {
            state.isPetDeleted = true
        })
        
        //hande success state
        builder.addCase(deletepetAction.fulfilled, (state, action) => {
            state.deletepetCreated = action?.payload;
            state.deletepetLoading = false;
            state.deletepetAppErr = undefined;
            state.deletePeterverErr = undefined;
            state.isPetDeleted = false
        });
        //hande rejected state

        builder.addCase(deletepetAction.rejected, (state, action) => {
            state.deletepetLoading = false;
            state.deletepetAppErr = action?.payload?.msg;
            state.deletePeterverErr = action?.error?.msg;
        })

    }
})

export default PetsSlices.reducer;