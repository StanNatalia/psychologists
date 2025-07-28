import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operations";

const initialState = {
  all: [],
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
    builder.addCase(fetchPsychologists.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

export const { setPsychologists } = psychologistSlice.actions;
export default psychologistSlice.reducer;
