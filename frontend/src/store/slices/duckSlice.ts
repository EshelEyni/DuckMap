import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duck } from "../../../../shared/types/system";
import { AppThunk } from "../../types/app";
import duckService from "../../services/duckService";

type DuckState = {
  ducks: Duck[];
};

const initialState: DuckState = {
  ducks: [],
};

const duckSlice = createSlice({
  name: "duck",
  initialState,
  reducers: {
    setDucks(state, action: PayloadAction<Duck[]>) {
      state.ducks = action.payload;
    },
  },
});

export const { setDucks } = duckSlice.actions;

export default duckSlice.reducer;

export function getDucks(): AppThunk {
  return async dispatch => {
    try {
      const ducks = await duckService.query();

      dispatch(setDucks(ducks));
    } catch (err) {
      console.error(err);
    }
  };
}
