import { Bar } from "../app/State";
import bubbleSort from "./bubble";
import quickSort from "./quick";

const sort = (whichAlgorithm: string, unSortedArr: Bar[]) => {
  if (whichAlgorithm === "bubble") {
    return bubbleSort(unSortedArr);
  } else {
    return quickSort(unSortedArr);
  }
};

export default sort;
