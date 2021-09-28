import { useContext, useEffect, useRef } from "react";
import AppContext from "../app/AppContext";
import * as d3 from "d3";
import { intervalID } from "../algorithm/sort";

const Main = () => {
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const { AppState, dispatch } = useContext(AppContext);
  const resize = () => {
    clearInterval(intervalID);
    dispatch({
      type: "SORT_DONE",
    });
    let width = mainRef.current.getBoundingClientRect().width - 20;
    let height = mainRef.current.getBoundingClientRect().height - 20;
    d3.selectAll(".bar").remove();
    dispatch({
      type: "ADD_BARS",
      payload: [],
    });
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
