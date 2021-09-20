import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: '',
};

export const addLikedSong = createAsyncThunk(
  'songcard/addLikedSong',
  async (data) => {
    const res = await axios.post(`/api/likedsongs/add/${data.id}`, {
      data: data.song,
    });
    return res.data;
  }
);

const searchSlice = createSlice({
  name: 'songcard',
  initialState,
  reducers: {},
  extraReducers: {
    [addLikedSong.fulfilled]: (state, { payload }) => {
      console.log(state, payload);
    },
  },
});

export default searchSlice.reducer;
