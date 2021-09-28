import { AppStateType, ModalOpenPayloadType, Bar } from "./State";

export type ActionType =
  | { type: "PLAY"; payload: boolean }
  | { type: "SORT_DONE"; payload: boolean }
  | { type: "SWAP_ANIMATION_DONE"; payload: boolean }
  | { type: "ADD_ALGORITHM"; payload: string }
  | { type: "ADD_ARRAY"; payload: Bar[] }
  | { type: "NEW_BARS_ADDED"; payload: boolean }
  | { type: "ADD_SPEED"; payload: number }
  | { type: "OPEN_MODAL"; payload: ModalOpenPayloadType }
  | { type: "CLOSE_MODAL" }
  | { type: "CHANGE_SCREEN" }
  | { type: "ADD_SVG"; payload: any };

export type ReducerType<S, A> = (state: S, action: A) => S;

const Reducer: ReducerType<AppStateType, ActionType> = (state, action) => {
  if (action.type === "NEW_BARS_ADDED") {
    return {
      ...state,
      isNewBarsAdded: action.payload,
    };
  }
  if (action.type === "SORT_DONE") {
    return {
      ...state,
      isSortDone: action.payload,
    };
  }
  if (action.type === "SWAP_ANIMATION_DONE") {
    return {
      ...state,
      isSwapAnimationDone: action.payload,
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
      isPlay: false,
      isSwapAnimationDone: false,
      barsArray: [],
      isNewBarsAdded: false,
      isSortDone: false,
    };
  }

  if (action.type === "ADD_ARRAY") {
    return {
      ...state,
      barsArray: action.payload,
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
