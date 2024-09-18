import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2000/linksharing/users/login', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue('Account not found');
      } else if (error.response && error.response.status === 401) {
        return rejectWithValue('Wrong Password');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:2000/linksharing/users/register', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue('Email already taken');
      }
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put('http://localhost:2000/linksharing/users/update', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Unknown error occurred');
    }
  }
);

export const updateUserImage = createAsyncThunk(
  'user/img',
  async ({ url, currentEmail }, { rejectWithValue }) => {
    try {
      const response = await axios.put('http://localhost:2000/linksharing/users/img', { url, currentEmail });
      return response.data;
    } catch (error) {
      console.error('Error occurred:', error);
      return rejectWithValue(error.response?.data?.message || 'Unknown error occurred');
    }
  }
);

const initialState = {
  userData: {},
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = { ...state.userData, ...action.payload.user}
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = { ...state.userData, img: action.payload.img };
    })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;