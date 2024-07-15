import { configureStore } from "@reduxjs/toolkit";
import duckSlice from "./slices/duckSlice";

export const store = configureStore({
  reducer: {
    duck: duckSlice,
  },
});
