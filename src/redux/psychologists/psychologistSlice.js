import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operations";

const initialState = {
  all: [],
  isLoading: false,
  error: null,
};

const psychologistSlice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {
    setPsychologists: (state, action) => {
      state.all = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.all = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPsychologists } = psychologistSlice.actions;
export default psychologistSlice.reducer;
