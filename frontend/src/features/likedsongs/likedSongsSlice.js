import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  likedSongs: [],
};

export const getLikedSongs = createAsyncThunk(
  'likedsongs/getLikedSongs',
  async (data) => {
    const res = await axios.get(`/api/likedsongs/${data.id}`);
    return res.data;
  }
);

const likedSongsSlice = createSlice({
  name: 'likedsongs',
  initialState,
  reducers: {},
  extraReducers: {
    [getLikedSongs.fulfilled]: (state, { payload }) => {
      state.likedSongs = payload.likedSongs;
    },
  },
});

export default likedSongsSlice.reducer;
