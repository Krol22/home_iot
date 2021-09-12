import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import deviceSlice from "./features/deviceSlice"

const createReducer = (injectedReducers = {}) => {
  return combineReducers({
    deviceSlice,
    ...injectedReducers,
  });
};

const getMiddleware = () => {
  let middleware = [...getDefaultMiddleware()];

  if (process.env.NODE_ENV !== "production") {
    middleware = [...middleware, logger];
  }

  return middleware;
}

export default configureStore({
  reducer: createReducer(),
  middleware: [...getMiddleware()],
  devTools: process.env.NODE_ENV !== "production",
});
