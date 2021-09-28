import { useContext, useEffect, useRef } from "react";
import AppContext from "../app/AppContext";
import * as d3 from "d3";
import quickSort, { SwapObjType } from "../algorithm/quick";
import { Bar } from "../app/State";

const Main = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const animationRef = useRef(0);
  const sortedArrRef = useRef([] as Bar[]);
  const swapObjArrRef = useRef([] as SwapObjType[]);
  const indexRef = useRef(-1);

  let swap = (swapObjArr: SwapObjType[], currIndex: number, speed: number) => {
    if (currIndex >= swapObjArr.length) {
      dispatch({
        type: "ADD_BARS",
        payload: sortedArrRef.current,
      });
      dispatch({
        type: "SORT_DONE",
      });
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
    console.log("animationSort");
    swap(swapObjArrRef.current, indexRef.current + 1, AppState.speed);
    indexRef.current++;
  };
  useEffect(() => {
    if (AppState.isPlay) {
      const { swapObjArr, sortedArr } = quickSort(AppState.bars);
      sortedArrRef.current = sortedArr;
      swapObjArrRef.current = swapObjArr;
      indexRef.current = -1;
      animationRef.current = requestAnimationFrame(animateSort);
      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    }
    return () => {
      console.log(`return when appState.isPlay ->${AppState.isPlay} `);
    };
  }, [AppState.isPlay]);

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
    AppState.bars.forEach((bar) => {
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
  }, [AppState.bars]);
  return <main ref={mainRef} id="main" className="main"></main>;
};

export default Main;
