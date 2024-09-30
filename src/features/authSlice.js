import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {getAPI, deleteAPI, postAPI} from '../libs/api'

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await postAPI('login', {
            username: user.username,
            password: user.password
        }, { withCredentials: true });
        return response;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await getAPI('me', { withCredentials: true });
        return response;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});


export const LogOut = createAsyncThunk("user/LogOut", async () => {
    await deleteAPI('logout');
});
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset : (state) => initialState,
        setErrorMessage: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading =false
            state.isSuccess= true
            state.user = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) =>{
             state.isLoading = false
             state.isError = true
             state.message= action.payload
        })
        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})
export const {reset} = authSlice.actions
export default authSlice.reducer