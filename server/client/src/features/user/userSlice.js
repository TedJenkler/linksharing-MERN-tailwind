import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserByEmail = createAsyncThunk(
    'user/getUserByEmail',
    async (email, thunkAPI) => {
      try {
        const response = await fetch(`https://linksharing-mern-tailwind.onrender.com/users/getUserByEmail/${email}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user by email');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
);

export const getUserByToken = createAsyncThunk(
  'user/getUserByToken',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://linksharing-mern-tailwind.onrender.com/users/getUserByToken', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      if(response.status === 401) {
        localStorage.removeItem('token');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user');
    }
    const data = await response.json();
    return data;
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      thunkAPI.dispatch(registerStart());

      const response = await fetch('https://linksharing-mern-tailwind.onrender.com/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
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

      const response = await fetch('https://linksharing-mern-tailwind.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if(response.status === 401) {
        console.log('Unauthorized: Please check your credentials');
        throw new Error('Unauthorized: Please check your credentials');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      const { token } = await response.json();

      localStorage.setItem('token', token);

      thunkAPI.dispatch(registerSuccess());
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

      const formData = new FormData();

      if (userData.img) {
        formData.append('img', userData.img);
      }

      // Append other user data fields to FormData if needed
      formData.append('firstname', userData.firstname);
      formData.append('lastname', userData.lastname);
      formData.append('email', userData.email);

      const response = await fetch('https://linksharing-mern-tailwind.onrender.com/users/profile/update', {
        method: 'PUT',
        headers: {
          // No need to set Content-Type for FormData, it's set automatically
          'Authorization': `Bearer ${token}`,
        },
        body: formData, // Use FormData object as the request body
      });

      if (!response.ok) {
        if(response.status === 401) {
          localStorage.removeItem('token');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const updateUser = await response.json();
      return updateUser;

    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

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
