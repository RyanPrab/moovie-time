import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genres: {}
};

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenres(state, action) {
      state.genres = action.payload;
    }
  }
});

export const genreActions = genreSlice.actions;

export default genreSlice.reducer;
