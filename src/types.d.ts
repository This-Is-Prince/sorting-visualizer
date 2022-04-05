import { Bar } from "./app/State";

export type SwapObjType = {
  first: Bar;
  second: Bar;
  isSwap: boolean;
  isMakeHeap?: boolean;
};

export type ModalOpenPayloadType = { for: string; id: number };
export interface AppStateType {
  isPlay: boolean;
  isModalOpen: boolean;
  modalState: ModalOpenPayloadType;
  whichAlgorithm: string;
  speed: number;
  isSortDone: boolean;
  barsArray: Bar[];
  isNewBarsAdded: boolean;
  svg: {
    box: any;
    width: number;
    height: number;
  };
  isFullScreen: boolean;
  isAlgorithmModelOpen: boolean;
}
