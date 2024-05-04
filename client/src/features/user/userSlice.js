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
  },
})

export const { registerStart, registerSuccess, registerFailure } = userSlice.actions

export default userSlice.reducer