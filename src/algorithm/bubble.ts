import { Bar } from "../app/State";

const bubbleSort = (barsArr: Bar[]) => {
  let bars = [...barsArr];
  let sortArr = [];
  let i,
    j,
    size = bars.length;
  for (i = 0; i < size - 1; i++) {
    for (j = 0; j < size - i - 1; j++) {
      if (bars[j].getHeight() > bars[j + 1].getHeight()) {
        let first = bars[j];
        let second = bars[j + 1];

        let barObj = {
          first,
          second,
        };
        bars[j] = second;
        bars[j + 1] = first;
        sortArr.push(barObj);
      }
    }
  }
  console.log(bars);

  return sortArr;
};

export default bubbleSort;
