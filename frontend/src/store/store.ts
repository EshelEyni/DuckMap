import { configureStore } from "@reduxjs/toolkit";
import duckSlice from "./slices/duckSlice";
import viewSlice from "./slices/viewSlice";

export const store = configureStore({
  reducer: {
    duck: duckSlice,
    view: viewSlice,
  },
});
