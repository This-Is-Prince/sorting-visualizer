import { Bar } from "../app/State";
import bubbleSort from "./bubble";
import mergeSort from "./merge";
import quickSort from "./quick";

const sort = (whichAlgorithm: string, unSortedArr: Bar[]) => {
  if (whichAlgorithm === "bubble") {
    return bubbleSort(unSortedArr);
  } else if (whichAlgorithm === "quick") {
    return quickSort(unSortedArr);
  } else {
    return mergeSort(unSortedArr);
  }
};

export default sort;
