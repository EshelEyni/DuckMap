import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duck } from "../../../../shared/types/system";
import {
  defaultQueryState,
  getErrorMessage,
  QUERY_TIMEOUT,
} from "../../services/utilService";
import { AppThunk, QueryState } from "../../types/app";
import duckService from "../../services/duckService";

type DuckState = {
  ducks: Duck[];
  ducksQueryState: QueryState;
};

const initialState: DuckState = {
  ducks: [],
  ducksQueryState: defaultQueryState,
};

const duckSlice = createSlice({
  name: "duck",
  initialState,
  reducers: {
    setDucks(state, action: PayloadAction<Duck[]>) {
      state.ducks = action.payload;
    },
    setDucksQueryState(state, action: PayloadAction<QueryState>) {
      state.ducksQueryState = action.payload;
    },
  },
});

export const { setDucks, setDucksQueryState } = duckSlice.actions;

export default duckSlice.reducer;

export function getDucks(): AppThunk {
  return async dispatch => {
    try {
      dispatch(setDucksQueryState({ state: "loading", error: null }));
      const ducks = await duckService.query();

      dispatch(setDucks(ducks));
      dispatch(setDucksQueryState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setDucksQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setDucksQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}
