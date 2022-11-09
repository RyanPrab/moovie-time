import { configureStore } from "@reduxjs/toolkit";

import genreReducer from "./genre-movie";

const store = configureStore({
  reducer: {
    genre: genreReducer
  }
});

export default store;
