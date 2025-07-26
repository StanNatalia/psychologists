import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import favoriteReducer from "./slices/favoriteSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "auth-data",
  version: 1,
  storage,
  whitelist: ["name", "email", "token", "id"],
};

const favoritesPersistConfig = {
  key: "favorites-data",
  version: 1,
  storage,
  whitelist: ["favorites"],
};

const rootReducer = {
  user: persistReducer(userPersistConfig, userReducer),
  favorites: persistReducer(favoritesPersistConfig, favoriteReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
