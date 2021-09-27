import React, { useContext, useEffect, useRef } from "react";
import AppContext from "../app/AppContext";
import * as d3 from "d3";

const Main = () => {
  const mainRef = useRef<HTMLElement>({} as HTMLElement);

  const { AppState, dispatch } = useContext(AppContext);
  const resize = () => {
    let width = mainRef.current.getBoundingClientRect().width - 20;
    let height = mainRef.current.getBoundingClientRect().height - 20;
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
    let svg = AppState.svg.box;
    let bars = AppState.bars;
    bars.forEach((bar) => {
      svg
        .append("rect")
        .attr("class", "bar")
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
