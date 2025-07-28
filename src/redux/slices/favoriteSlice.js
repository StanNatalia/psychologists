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
      console.log("Before toggle:", state.favorites);
      if (state.favorites.includes(name)) {
        state.favorites = state.favorites.filter((fav) => fav !== name);
      } else {
        state.favorites.push(name);
      }
      console.log("After toggle:", state.favorites, typeof state.favorites);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
