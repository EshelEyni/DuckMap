import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseDuck, Duck } from "../../../../shared/types/system";
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
    setAddedDuck(state, action: PayloadAction<Duck>) {
      state.ducks.push(action.payload);
    },
  },
});

export const { setDucks, setAddedDuck } = duckSlice.actions;

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

export function addDuck(duck: BaseDuck): AppThunk {
  return async dispatch => {
    try {
      const addedDuck = await duckService.create(duck);

      dispatch(setAddedDuck(addedDuck));
    } catch (err) {
      console.error(err);
    }
  };
}
