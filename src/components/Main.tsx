import React, { useContext, useEffect } from "react";
import AppContext from "../app/AppContext";
import * as d3 from "d3";

const Main = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const resize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight - 60;
    console.log("Width :- " + width);
    console.log("height :- " + height);

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
    bars.forEach((bar, index) => {
      // if (index % 2 === 0) {
      svg
        .append("rect")
        .attr("class", "bar")
        .attr("x", bar.width * index + 2 * index)
        .attr("y", 0)
        .attr("width", bar.width)
        .attr("height", bar.height)
        .attr("fill", "#00214d");
      // } else {
      //   svg
      //     .append("rect")
      //     .attr("class", "bar")
      //     .attr("x", bar.width * index + 2 * index)
      //     .attr("y", 0)
      //     .attr("width", bar.width)
      //     .attr("height", bar.height)
      //     .attr("fill", "#ffd803");
      // }
    });
  }, [AppState.bars]);
  return <main id="main" className="main"></main>;
};

export default Main;
