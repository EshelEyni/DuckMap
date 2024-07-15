// src/redux/selectors/duckSelectors.ts
import { createSelector } from "reselect";
import { RootState } from "../../types/app";

const selectDuckState = (state: RootState) => state.duck;

export const selectDucks = createSelector(
  [selectDuckState],
  duckState => duckState.ducks,
);
