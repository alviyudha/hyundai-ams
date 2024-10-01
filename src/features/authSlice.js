import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../utils/api';

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const LoginUser = createAsyncThunk("auth/LoginUser", async (user, thunkAPI) => {
    try {
        const token = await api.login({
            username: user.username,
            password: user.password
        });
        return token;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
    try {
        const user = await api.getOwnProfile();
        return user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const LogOut = createAsyncThunk("auth/LogOut", async () => {
    localStorage.removeItem("accessToken");
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        setErrorMessage: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Login successful!";
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // Get user details
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

        // Handle Logout
        builder.addCase(LogOut.fulfilled, (state) => {
            state.user = null;
            state.isSuccess = false;
            state.isError = false;
            state.message = "Logged out successfully!";
        });
    }
});

export const { reset, setErrorMessage } = authSlice.actions;
export default authSlice.reducer;
