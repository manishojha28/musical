import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isLoggedIn: false,
  success: null,
  message: '',
};

export const userLogin = createAsyncThunk('user/userLogin', async (data) => {
  let user = await axios.post('/api/login', data);
  return user.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setAuthStatus: (state, action) => {
      state = {
        user: action.payload,
        isLoggedIn: true,
        success: null,
        message: '',
      };
      return state;
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state = {
          user: payload.response[0],
          isLoggedIn: payload.success,
          success: payload.success,
          message: '',
        };
      } else {
        state = {
          user: payload.response,
          isLoggedIn: payload.success,
          success: payload.success,
          message: payload.message,
        };
      }
      return state;
    },
  },
});

export const { setMessage, setUser, setIsLoggedIn, setAuthStatus } =
  userSlice.actions;
export default userSlice.reducer;
