import React from "react";
import { AppStateType, ModalOpenPayloadType, Bar } from "./State";

export type ActionType =
  | { type: "PLAY" }
  | { type: "SELECT_ALGORITHM" }
  | { type: "SELECT_ARRAY" }
  | { type: "SORT_DONE" }
  | { type: "ADD_ALGORITHM"; payload: string }
  | { type: "ADD_SIZE"; payload: number }
  | { type: "ADD_SPEED"; payload: "SLOW" | "FAST" | "NORMAL" }
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
      svg: action.payload,
    };
  }
  if (action.type === "ADD_BARS") {
    return {
      ...state,
      bars: action.payload,
    };
  }

  if (action.type === "ADD_SIZE") {
    let bars: Bar[] = [];
    let size = action.payload;
    let width = state.svg.width;
    let height = state.svg.height;
    let ratio = (width - size * 2) / size;

    for (let i = 0; i < size; i++) {
      let bar = new Bar(
        ratio,
        Math.floor(Math.random() * height),
        `bar-${i}`,
        "#00214d",
        0,
        ratio * i + 2 * i,
        i
      );
      bars.push(bar);
    }
    return {
      ...state,
      size,
      bars,
      isSortDone: false,
      isSizeBannerOpen: false,
    };
  }
  if (action.type === "ADD_ALGORITHM") {
    return {
      ...state,
      whichAlgorithm: action.payload,
      isAlgoBannerOpen: false,
    };
  }
  if (action.type === "ADD_SPEED") {
    return {
      ...state,
      speed: action.payload,
    };
  }
  if (action.type === "SELECT_ALGORITHM") {
    return {
      ...state,
      isAlgoBannerOpen: true,
    };
  }
  if (action.type === "SELECT_ARRAY") {
    return {
      ...state,
      isSizeBannerOpen: true,
    };
  }
  if (action.type === "PLAY") {
    return {
      ...state,
      isPlay: !state.isPlay,
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
