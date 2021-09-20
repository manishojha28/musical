import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  songs: [],
  loading: false,
};

export const getSongs = createAsyncThunk('home/getSongs', async () => {
  const res = await axios.get(
    'https://salty-savannah-18584.herokuapp.com/playlist/?query=https://www.jiosaavn.com/featured/lyrically-mast/BWNIAJIwMPkwkg5tVhI3fw__'
  );
  return res.data;
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [getSongs.pending]: (state) => {
      state.loading = true;
    },
    [getSongs.fulfilled]: (state, { payload }) => {
      state.songs = payload.songs;
      state.loading = false;
      return state;
    },
  },
});

export default homeSlice.reducer;
