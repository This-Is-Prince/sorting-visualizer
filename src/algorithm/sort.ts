import { Bar } from "../app/State";
import * as d3 from "d3";
import bubbleSort from "./bubble";
const swapEvent = new Event("swap-done");
interface ArrType {
  first: Bar;
  second: Bar;
}

export let intervalID: any;
let isSwap = false;
let swap = (arr: ArrType[], currIndex: number, speed: number) => {
  if (currIndex >= arr.length) {
    clearInterval(intervalID);
    window.dispatchEvent(swapEvent);
    return;
  }
  if (currIndex != 0) {
    let first = arr[currIndex - 1].first;
    let second = arr[currIndex - 1].second;
    d3.select(`#${first.getId()}`)
      .transition()
      .duration(speed)
      .attr("fill", first.getColor());
    d3.select(`#${second.getId()}`)
      .transition()
      .duration(speed)
      .attr("fill", second.getColor());
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
    .attr("fill", "#ffd803")
    .attr("x", first.getX());
  d3.select(`#${second.getId()}`)
    .transition()
    .duration(speed)
    .attr("fill", "#ffd803")
    .attr("x", second.getX())
    .on("end", () => {
      isSwap = true;
    });
};
const Sort = (algo: string, speed: number, bars: Bar[]) => {
  let { bars: sortBars, sortArr: arr } = bubbleSort(bars);
  isSwap = true;
  let index = -1;
  intervalID = setInterval(() => {
    if (isSwap) {
      isSwap = false;
      swap(arr, index + 1, speed);
      index++;
    }
  }, 0);
  return sortBars;
};

export default Sort;
