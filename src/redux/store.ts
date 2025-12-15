import authReducer from "./reducer/auth";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import siteReducer from "./reducer/site";
import userReducer from "./reducer/user";
import globalsReducer from "./reducer/globals";

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  site: siteReducer,
  globals: globalsReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  // middleware: (getDefaultMiddleware) => 
  //   getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
