import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../store/store";
import { Action } from "redux";

export type ReduxStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<Promise<void>, RootState, undefined, Action>;
export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;
export type ViewMode = "map" | "form";
