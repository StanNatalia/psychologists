import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const name = action.payload;
      if (state.favorites.includes(name)) {
        state.favorites = state.favorites.filter((fav) => fav !== name);
      } else {
        state.favorites.push(name);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
