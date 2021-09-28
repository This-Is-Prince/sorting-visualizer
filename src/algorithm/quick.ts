import { Bar } from "../app/State";

const swap = (sortedArr: Bar[], i: number, j: number) => {
  let temp = sortedArr[i];
  sortedArr[i] = sortedArr[j];
  sortedArr[j] = temp;
};
export type SwapObjType = { first: Bar; second: Bar };

let swapObjArr: SwapObjType[] = [];

const partition = (sortedArr: Bar[], low: number, high: number) => {
  let left = low;
  let right = high;
  let pivot = low;
  while (true) {
    while (
      sortedArr[pivot].getHeight() <= sortedArr[right].getHeight() &&
      pivot !== right
    ) {
      right--;
    }
    if (pivot === right) {
      return pivot;
    } else if (sortedArr[pivot].getHeight() > sortedArr[right].getHeight()) {
      swap(sortedArr, pivot, right);
      let first = sortedArr[pivot];
      let second = sortedArr[right];
      let swapObj = {
        first,
        second,
      };
      swapObjArr.push(swapObj);
      pivot = right;
    }
    while (
      sortedArr[left].getHeight() <= sortedArr[pivot].getHeight() &&
      pivot !== left
    ) {
      left++;
    }
    if (pivot === left) {
      return pivot;
    } else if (sortedArr[left].getHeight() > sortedArr[pivot].getHeight()) {
      swap(sortedArr, left, pivot);
      let first = sortedArr[left];
      let second = sortedArr[pivot];
      let swapObj = {
        first,
        second,
      };
      swapObjArr.push(swapObj);
      pivot = left;
    }
  }
};
const quickSortMain = (sortedArr: Bar[], low: number, high: number) => {
  if (low < high) {
    let pi = partition(sortedArr, low, high);
    quickSortMain(sortedArr, low, pi - 1);
    quickSortMain(sortedArr, pi + 1, high);
  }
};
const quickSort = (unSortedArr: Bar[]) => {
  console.log(unSortedArr);
  let sortedArr = [...unSortedArr];
  swapObjArr = [];
  quickSortMain(sortedArr, 0, sortedArr.length - 1);
  console.log(sortedArr);
  return { swapObjArr, sortedArr };
};
export default quickSort;
