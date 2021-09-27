import React from "react";
import { AppStateType, ModalOpenPayloadType } from "./State";
import gsap from "gsap";

export type ActionType =
  | { type: "PLAY" }
  | { type: "ADD_ALGORITHM"; payload: string }
  | { type: "ADD_SIZE"; payload: number }
  | { type: "ADD_SPEED"; payload: "slow" | "fast" | "normal" }
  | { type: "OPEN_MODAL"; payload: ModalOpenPayloadType }
  | { type: "CLOSE_MODAL" }
  | { type: "ADD_BARS"; payload: any[] }
  | { type: "CHANGE_SCREEN" }
  | { type: "ADD_SVG"; payload: any };

export type ReducerType<S, A> = (state: S, action: A) => S;

const Reducer: ReducerType<AppStateType, ActionType> = (state, action) => {
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
    let bars = [];
    let size = action.payload;
    let width = state.svg.width;
    let height = state.svg.height;
    let ratio = (width - size * 2) / size;

    for (let i = 0; i < size; i++) {
      let obj = {
        width: ratio,
        height: Math.floor(Math.random() * height),
      };
      bars.push(obj);
    }
    return {
      ...state,
      size,
      bars,
    };
  }
  if (action.type === "ADD_ALGORITHM") {
    return {
      ...state,
      whichAlgorithm: action.payload,
      isBannerOpen: false,
    };
  }
  if (action.type === "ADD_SPEED") {
    return {
      ...state,
      speed: action.payload,
    };
  }
  if (action.type === "PLAY") {
    if (state.whichAlgorithm === "") {
      return {
        ...state,
        isBannerOpen: true,
      };
    }
    return {
      ...state,
      isPlay: !state.isPlay,
    };
  }
  if (action.type === "CLOSE_MODAL") {
    gsap.fromTo(".modal__container", { x: "0", duration: 3 }, { x: "-100%" });
    return {
      ...state,
      isModalOpen: false,
    };
  }
  if (action.type === "OPEN_MODAL") {
    gsap.fromTo(".modal__container", { x: "-100%", duration: 3 }, { x: "0" });
    return {
      ...state,
      isModalOpen: true,
      modalState: action.payload,
    };
  }
  return state;
};
export default Reducer;
