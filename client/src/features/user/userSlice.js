import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, thunkAPI) => {
        try {
            thunkAPI.dispatch(registerStart());

            const response = await fetch('http://localhost:2000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to register user')
            }
            thunkAPI.dispatch(registerSuccess());
            return await response.json();
        } catch (error) {
            thunkAPI.dispatch(registerFailure(error.message));
            throw error;
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, thunkAPI) => {
        try {
            thunkAPI.dispatch(loginStart());

            const response = await fetch('http://localhost:2000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to login')
            }

            const { token } = await response.json();

            localStorage.setItem('token', token);

            thunkAPI.dispatch(registerSuccess());
            console.log("logged in")
            return await response.json();
        } catch (error) {
            thunkAPI.dispatch(registerFailure(error.message));
            throw error;
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async (userData, thunkAPI) => {
        try {
            thunkAPI.dispatch(updateStart());

            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:2000/users/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user')
            }

            const updateUser = await response.json()
            return updateUser;

        }catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)

const initialState = {
    loading: false,
    error: null,
  };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerStart(state) {
        state.loading = true;
        state.error = null;
    },
    registerSuccess(state) {
        state.loading = false;
    },
    registerFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
    },
    loginStart(state) {
        state.loading = true;
        state.error = null;
    },
    loginSuccess(state) {
        state.loading = false;
    },
    loginFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
    },
    updateStart(state) {
        state.loading = true;
        state.error = null;
    },
    updateSuccess(state) {
        state.loading = false;
    },
    updateFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
    }
  },
})

export const { registerStart, registerSuccess, registerFailure, loginStart, loginSuccess, loginFailure, updateStart, updateSuccess, updateFailure } = userSlice.actions

export default userSlice.reducer