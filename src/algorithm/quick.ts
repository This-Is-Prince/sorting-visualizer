import { Bar } from "../app/State";

const swap = (bars: Bar[], i: number, j: number) => {
  let temp = bars[i];
  bars[i] = bars[j];
  bars[j] = temp;
};
type Obj = { first: Bar; second: Bar };

let sortArr: Obj[] = [];

const partition = (bars: Bar[], low: number, high: number) => {
  let left = low;
  let right = high;
  let pivot = low;
  while (true) {
    while (
      bars[pivot].getHeight() <= bars[right].getHeight() &&
      pivot !== right
    ) {
      right--;
    }
    if (pivot === right) {
      return pivot;
    } else if (bars[pivot].getHeight() > bars[right].getHeight()) {
      swap(bars, pivot, right);
      let first = bars[pivot];
      let second = bars[right];
      let barObj = {
        first,
        second,
      };
      sortArr.push(barObj);
      pivot = right;
    }
    while (
      bars[left].getHeight() <= bars[pivot].getHeight() &&
      pivot !== left
    ) {
      left++;
    }
    if (pivot === left) {
      return pivot;
    } else if (bars[left].getHeight() > bars[pivot].getHeight()) {
      swap(bars, left, pivot);
      let first = bars[left];
      let second = bars[pivot];
      let barObj = {
        first,
        second,
      };
      sortArr.push(barObj);
      pivot = left;
    }
  }
};
const quickSortMain = (barsArr: Bar[], low: number, high: number) => {
  if (low < high) {
    let pi = partition(barsArr, low, high);
    quickSortMain(barsArr, low, pi - 1);
    quickSortMain(barsArr, pi + 1, high);
  }
};
const quickSort = (barsArr: Bar[]) => {
  console.log(barsArr);
  let bars = [...barsArr];
  sortArr = [];
  quickSortMain(bars, 0, barsArr.length - 1);
  console.log(bars);
  return { sortArr, bars };
};
export default quickSort;
