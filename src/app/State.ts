export class Bar {
  constructor(
    private width: number,
    private height: number,
    private id: string,
    private color: string,
    private y: number,
    private x: number,
    private index: number
  ) {}
  getIndex() {
    return this.index;
  }
  setIndex(value: number) {
    this.index = value;
  }
  getWidth() {
    return this.width;
  }
  setWidth(value: number) {
    this.width = value;
  }
  getHeight() {
    return this.height;
  }
  setHeight(value: number) {
    this.height = value;
  }
  getColor() {
    return this.color;
  }
  setColor(value: string) {
    this.color = value;
  }
  getId() {
    return this.id;
  }
  setId(value: string) {
    this.id = value;
  }
  getX() {
    return this.x;
  }
  setX(value: number) {
    this.x = value;
  }
  getY() {
    return this.y;
  }
  setY(value: number) {
    this.y = value;
  }
}

export type ModalOpenPayloadType = { for: string; id: number };
export interface AppStateType {
  isPlay: boolean;
  isSwapAnimationDone: boolean;
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
}
const AppInitialState: AppStateType = {
  isPlay: false,
  isSwapAnimationDone: false,
  isModalOpen: false,
  modalState: { for: "", id: 1 },
  whichAlgorithm: "",
  speed: 750,
  isSortDone: true,
  isNewBarsAdded: false,
  barsArray: [],
  svg: { box: undefined, height: 0, width: 0 },
  isFullScreen: false,
};
export default AppInitialState;
