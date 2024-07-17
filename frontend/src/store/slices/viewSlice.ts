import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewMode } from "../../types/app";

type ViewState = {
  viewMode: ViewMode;
};

const initialState: ViewState = {
  viewMode: "map",
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
  },
});

export const { setViewMode } = viewSlice.actions;

export default viewSlice.reducer;
