export type ModalOpenPayloadType = { for: string; id: number };
export interface AppStateType {
  isPlay: boolean;
  isModalOpen: boolean;
  modalState: ModalOpenPayloadType;
  whichAlgorithm: string;
  speed: "slow" | "fast" | "normal";
  isBannerOpen: boolean;
  size: number;
}
const AppInitialState: AppStateType = {
  isPlay: false,
  isModalOpen: false,
  modalState: { for: "", id: 1 },
  whichAlgorithm: "",
  speed: "normal",
  isBannerOpen: false,
  size: 10,
};
export default AppInitialState;
