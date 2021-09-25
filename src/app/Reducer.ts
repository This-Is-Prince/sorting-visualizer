import React from "react";
import { AppStateType, ModalOpenPayloadType } from "./State";
import gsap from "gsap";
import gsapCore from "gsap/gsap-core";

export type ActionType =
  | { type: "PLAY" }
  | { type: "ADD_ALGORITHM"; payload: string }
  | { type: "ADD_SPEED"; payload: "slow" | "fast" | "normal" }
  | { type: "OPEN_MODAL"; payload: ModalOpenPayloadType }
  | { type: "CLOSE_MODAL" };

export type ReducerType<S, A> = (state: S, action: A) => S;

const Reducer: ReducerType<AppStateType, ActionType> = (state, action) => {
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
    if (state.whichAlgorithm === "") {
      gsap.to(".algo", {
        backgroundColor: "crimson",
        color: "#ffd803",
      });
      gsap.to(".algo__banner", {
        display: "block",
      });
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
    gsap.to(".algo", { clearProps: "all" });
    gsap.to(".algo__banner", { clearProps: "all" });
    return {
      ...state,
      isModalOpen: true,
      modalState: action.payload,
    };
  }
  return state;
};
export default Reducer;
