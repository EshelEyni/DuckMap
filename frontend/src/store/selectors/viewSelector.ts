// src/redux/selectors/duckSelectors.ts
import { createSelector } from "reselect";
import { RootState } from "../../types/app";

const selectViewState = (state: RootState) => state.view;

export const selectViewMode = createSelector(
  [selectViewState],
  s => s.viewMode,
);
