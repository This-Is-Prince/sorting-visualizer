import { Bar } from "../app/State";
import bubbleSort from "./bubble";
import heapSort from "./heap";
import mergeSort from "./merge";
import quickSort from "./quick";

const sort = (whichAlgorithm: string, unSortedArr: Bar[]) => {
  if (whichAlgorithm === "bubble") {
    return bubbleSort(unSortedArr);
  } else if (whichAlgorithm === "quick") {
    return quickSort(unSortedArr);
  } else if (whichAlgorithm === "merge") {
    return mergeSort(unSortedArr);
  } else {
    return heapSort(unSortedArr);
  }
};

export default sort;
