import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  searchedSongs: [],
  searching: null,
};

export const getSearchedSongs = createAsyncThunk(
  'search/getSearchedSongs',
  async (data) => {
    const res = await axios.get(
      `https://salty-savannah-18584.herokuapp.com/song/?query=${data.name}`
    );
    return res.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [getSearchedSongs.pending]: (state) => {
      state.searching = true;
    },
    [getSearchedSongs.fulfilled]: (state, { payload }) => {
      state.searchedSongs = payload;
      state.searching = false;
      return state;
    },
  },
});

export default searchSlice.reducer;
