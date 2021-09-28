import { useCallback, useContext, useEffect, useRef } from "react";
import AppContext from "../app/AppContext";
import * as d3 from "d3";
import { SwapObjType } from "../algorithm/quick";
import { Bar } from "../app/State";
import sort from "../algorithm/sort";

const Main = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const animationRef = useRef(0);
  const sortedArrRef = useRef([] as Bar[]);
  const swapObjArrRef = useRef([] as SwapObjType[]);
  const indexRef = useRef(-1);

  let swap = (swapObjArr: SwapObjType[], currIndex: number, speed: number) => {
    console.count("in swap");

    if (currIndex >= swapObjArr.length) {
      dispatch({ type: "ADD_ARRAY", payload: sortedArrRef.current });
      dispatch({ type: "NEW_BARS_ADDED", payload: true });
      dispatch({ type: "SWAP_ANIMATION_DONE", payload: true });
      cancelAnimationFrame(animationRef.current);
      return;
    }
    if (currIndex != 0) {
      let first = swapObjArr[currIndex - 1].first;
      let second = swapObjArr[currIndex - 1].second;
      d3.select(`#${first.getId()}`)
        .transition()
        .duration(speed)
        .attr("fill", first.getColor());
      d3.select(`#${second.getId()}`)
        .transition()
        .duration(speed)
        .attr("fill", second.getColor());
    }
    let first = swapObjArr[currIndex].first;
    let second = swapObjArr[currIndex].second;
    if (swapObjArr[currIndex].isSwap) {
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
          animationRef.current = requestAnimationFrame(animateSort);
        });
    } else {
      d3.select(`#${first.getId()}`)
        .transition()
        .duration(speed)
        .attr("fill", "#ff5470");
      d3.select(`#${second.getId()}`)
        .transition()
        .duration(speed)
        .attr("fill", "#ff5470")
        .on("end", () => {
          animationRef.current = requestAnimationFrame(animateSort);
        });
    }
  };
  const animateSort = () => {
    console.count("animationSort");
    swap(swapObjArrRef.current, indexRef.current + 1, AppState.speed);
    indexRef.current++;
  };
  useEffect(() => {
    console.count("in useEffect[AppState.isSortDone,AppState.isPlay]");

    if (!AppState.isSortDone) {
      console.count("in sort");

      console.count(`when appState.isSortDone ->${AppState.isSortDone} `);
      const { swapObjArr, sortedArr } = sort(
        AppState.whichAlgorithm,
        AppState.barsArray
      );
      sortedArrRef.current = sortedArr;
      swapObjArrRef.current = swapObjArr;
      indexRef.current = -1;
      animationRef.current = requestAnimationFrame(animateSort);
      dispatch({ type: "SORT_DONE", payload: true });
      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    }
    return () => {
      console.count(`return when appState.isPlay ->${AppState.isPlay} `);
      console.count(
        `return when appState.isSortDone ->${AppState.isSortDone} `
      );
    };
  }, [AppState.isSortDone]);

  const resize = () => {
    let width = mainRef.current.getBoundingClientRect().width - 20;
    let height = mainRef.current.getBoundingClientRect().height - 20;
    d3.selectAll(".bar").remove();
    d3.select("#box").remove();
    let box = d3
      .select("#main")
      .append("svg")
      .attr("id", "box")
      .attr("width", width)
      .attr("height", height);
    dispatch({ type: "ADD_SVG", payload: { box, width, height } });
  };
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    d3.selectAll(".bar").remove();
    AppState.barsArray.forEach((bar) => {
      AppState.svg.box
        .append("rect")
        .attr("class", "bar")
        .attr("id", bar.getId())
        .attr("x", bar.getX())
        .attr("y", bar.getY())
        .attr("width", bar.getWidth())
        .attr("height", bar.getHeight())
        .attr("fill", bar.getColor());
    });
  }, [AppState.barsArray]);
  return <main ref={mainRef} id="main" className="main"></main>;
};

export default Main;
