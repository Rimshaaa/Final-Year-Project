import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import cartSlice from "./cartSlice";
import notificationsReducer from "./notificationSlice";
import { api } from "./services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["authReducer", "globalSlice", "cartSlice"],
};
const reducer = combineReducers({
  authReducer,
  cartSlice,
  global: globalSlice,
  notifications: notificationsReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(api.middleware),
});
setupListeners(store.dispatch);
