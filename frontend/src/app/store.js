import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import userSignupReducer from '../features/user/userSignupSlice';
import homeReducer from '../features/home/homeSlice';
import searchReducer from '../features/search/searchSlice';
import likedSongsReducer from '../features/likedsongs/likedSongsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    signup: userSignupReducer,
    home: homeReducer,
    search: searchReducer,
    likedsongs: likedSongsReducer,
  },
});
