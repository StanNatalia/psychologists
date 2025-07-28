import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPsychologistsFromFirebase } from "../../services/firebase";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await getPsychologistsFromFirebase();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
