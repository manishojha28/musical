import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthStatus } from './userSlice';
import axios from 'axios';

const initialState = {
  success: false,
  message: '',
  loading: false,
  error: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
};

export const userSignup = createAsyncThunk(
  'signup/userSignup',
  async (data, { dispatch }) => {
    const user = await axios.post('/api/signup', data);
    if (user.data.success) {
      dispatch(setAuthStatus(user.data.response));
    }
    return user.data;
  }
);

const userSignupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [userSignup.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.success = payload.success;
      } else {
        state.message = payload.message;
      }
    },
  },
});

export const { setMessage, setError, setLoading } = userSignupSlice.actions;
export default userSignupSlice.reducer;
