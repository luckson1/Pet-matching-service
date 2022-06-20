import { createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../utils/BaseUrl";

//action for redirection
export const resetProfilecreated = createAction("user/created/reset")
//login action creation
export const resetLoginAction = createAction("user/login/reset")
export const registerUserAction = createAsyncThunk('user/register', async (payload, { rejectWithValue, getState, dispatch }) => {
    
    // configuring the request
    const config = {
        headers: {
            "Content-Type": "application/json",
          },
    };

    try {
        //http call
        const { data } = await axios.post(
            `${BaseURL}/users/register`,
            payload,
            config);

        //save user into localstorage
        localStorage.setItem('userInfo', JSON.stringify(data))
        return data;

    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }


});

//login action

export const loginUserAction = createAsyncThunk('user/login', async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
          },
    };

    try {
        //http call
        const { data } = await axios.post(
            `${BaseURL}/users/login`,
            payload,
            config);

        //save user into localstorage
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch(resetLoginAction())
        return data;

    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }


});

//Logout action
export const logout = createAsyncThunk(
    "user/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            //Save user into localstorage
            localStorage.removeItem("userInfo");
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

// get data of a single Profile

export const fetchUserProfileAction = createAsyncThunk('user/profile', async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    };

    try {
        //http call
        const { data } = await axios.get(
            `${BaseURL}/users/profile`, config);
           
        return data;

    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);

//create profile state
export const createProfileAction = createAsyncThunk('user/create', async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth? getState()?.users?.userAuth?.token: getState()?.users?.isRegistered?.token 
    console.log(userToken)
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
        
          
        },
    };

    try {
        //http call
        const { data } = await axios.put(
            `${BaseURL}/users`, payload, config);
          dispatch(resetProfilecreated()) 
        return data;

    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);

//slices
const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : undefined;
const usersSlices = createSlice({
    name: 'user',
    initialState: {
        userAuth: userLoginFromStorage
    },
    extraReducers: (builder) => {
        // register

        // handle pending state
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });

        //hande success state
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.isRegistered = action?.payload;
            state.userLoading = false;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        //handle rejected state

        builder.addCase(registerUserAction.rejected, (state, action) => {

            state.userLoading = false;
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });


        // login
        // handle pending state
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        builder.addCase(resetLoginAction, (state, action) => {
            state.isLoggedIn = true
        })
        //hande success state
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.userLoading = false;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
            state.isLoggedIn = false
        });
        //hande rejected state

        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userLoading = false;
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });


        // Logout
        builder.addCase(logout.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.userLoading = false;
        });
         // profile

        // handle pending state
        builder.addCase(fetchUserProfileAction.pending, (state, action) => {
            state.profileLoading = true;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });

        //hande success state
        builder.addCase(fetchUserProfileAction.fulfilled, (state, action) => {
            state.userProfile = action?.payload;
            state.profileLoading = false;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(fetchUserProfileAction.rejected, (state, action) => {

            state.profileLoading = false;
            state.profileAppErr = action?.payload?.msg;
            state.profileServerErr = action?.error?.msg;
        });

        // slices to handle change of profile info
           // handle pending state
           builder.addCase(createProfileAction.pending, (state, action) => {
            state.createProfileLoading = true;
            state.createProfileAppErr = undefined;
            state.createProfileServerErr = undefined;
        });
        builder.addCase(resetProfilecreated, (state, action) => {
            state.isProfilecreated = true
        })

        //hande success state
        builder.addCase(createProfileAction.fulfilled, (state, action) => {
            state.newProfile = action?.payload;
            state.createProfileLoading = false;
            state.createProfileAppErr = undefined;
            state.createProfileServerErr = undefined;
            state.isProfilecreated = false
        });
        //hande rejected state

        builder.addCase(createProfileAction.rejected, (state, action) => {

            state.createProfileLoading = false;
            state.createProfileAppErr = action?.payload?.msg;
            state.createProfileServerErr = action?.error?.msg;
        });


    }})


    export default usersSlices.reducer;
