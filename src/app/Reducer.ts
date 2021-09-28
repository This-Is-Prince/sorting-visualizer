import React from "react";
import { AppStateType, ModalOpenPayloadType, Bar } from "./State";

export type ActionType =
  | { type: "PLAY"; payload: boolean }
  | { type: "SORT_DONE" }
  | { type: "ADD_ALGORITHM"; payload: string }
  | { type: "ADD_ARRAY"; payload: Bar[] }
  | { type: "ADD_SPEED"; payload: number }
  | { type: "OPEN_MODAL"; payload: ModalOpenPayloadType }
  | { type: "CLOSE_MODAL" }
  | { type: "ADD_BARS"; payload: Bar[] }
  | { type: "CHANGE_SCREEN" }
  | { type: "ADD_SVG"; payload: any };

export type ReducerType<S, A> = (state: S, action: A) => S;

const Reducer: ReducerType<AppStateType, ActionType> = (state, action) => {
  if (action.type === "SORT_DONE") {
    return {
      ...state,
      isSortDone: true,
      isPlay: false,
    };
  }
  if (action.type === "CHANGE_SCREEN") {
    return {
      ...state,
      isFullScreen: !state.isFullScreen,
    };
  }
  if (action.type === "ADD_SVG") {
    return {
      ...state,
      isPlay: false,
      isModalOpen: false,
      isSortDone: false,
      bars: [],
      svg: action.payload,
    };
  }
  if (action.type === "ADD_BARS") {
    return {
      ...state,
      bars: action.payload,
    };
  }

  if (action.type === "ADD_ARRAY") {
    return {
      ...state,
      bars: action.payload,
      isSortDone: false,
    };
  }
  if (action.type === "ADD_ALGORITHM") {
    return {
      ...state,
      whichAlgorithm: action.payload,
    };
  }
  if (action.type === "ADD_SPEED") {
    return {
      ...state,
      speed: action.payload,
    };
  }

  if (action.type === "PLAY") {
    return {
      ...state,
      isPlay: action.payload,
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
    };
  }
  if (action.type === "OPEN_MODAL") {
    return {
      ...state,
      isModalOpen: true,
      modalState: action.payload,
    };
  }
  return state;
};
export default Reducer;
