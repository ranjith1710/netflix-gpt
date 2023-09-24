import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
    isGptSearchSuccess: true
  },
  reducers: {
    toggleGptSearchView: state => {
      state.showGptSearch = !state.showGptSearch;
      if (!state.showGptSearch) {
        state.isGptSearchSuccess = true;
        state.movieNames = null;
        state.movieResults = null;
      }
    },
    addGptMovieResults: (state, action) => {
      const { movieNames, movieResults, isGptSearchSuccess } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.isGptSearchSuccess = isGptSearchSuccess;
    }
  }
});

export const { toggleGptSearchView, addGptMovieResults } = gptSlice.actions;

export default gptSlice.reducer;
