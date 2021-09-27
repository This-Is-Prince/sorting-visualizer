import { Bar } from "../app/State";
import * as d3 from "d3";
import bubbleSort from "./bubble";

interface ArrType {
  first: Bar;
  second: Bar;
}
export let intervalID: any;
let isSwap = false;
let swap = (arr: ArrType[], currIndex: number, speed: number) => {
  console.log(intervalID);
  if (currIndex >= arr.length) {
    clearInterval(intervalID);
    console.log(intervalID);
    return;
  }
  let first = arr[currIndex].first;
  let second = arr[currIndex].second;
  let firstX = second.getX();
  let secondX = first.getX();
  first.setX(firstX);
  second.setX(secondX);
  d3.select(`#${first.getId()}`)
    .transition()
    .duration(speed)
    .attr("x", first.getX());
  d3.select(`#${second.getId()}`)
    .transition()
    .duration(speed)
    .attr("x", second.getX())
    .on("end", () => {
      isSwap = true;
    });
};
const Sort = (algo: string, speed: number, bars: Bar[]) => {
  let arr = bubbleSort(bars);
  isSwap = true;
  let index = -1;
  intervalID = setInterval(() => {
    if (isSwap) {
      isSwap = false;
      swap(arr, index + 1, speed);
      index++;
    }
  }, 0);
};

export default Sort;
