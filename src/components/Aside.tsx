import React, { useContext } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { VscSymbolArray } from "react-icons/vsc";
import { FaPauseCircle, FaPlayCircle, FaSitemap } from "react-icons/fa";
import AppContext from "../app/AppContext";
import * as d3 from "d3";

const Aside = () => {
  const { AppState, dispatch } = useContext(AppContext);
  return (
    <aside className="aside">
      <button
        className="flex-center btn"
        aria-label="speed"
        onClick={() => {
          dispatch({
            type: "OPEN_MODAL",
            payload: { for: "change speed", id: 1 },
          });
        }}
      >
        <IoMdSpeedometer />
      </button>
      <button
        className="flex-center btn"
        aria-label="size"
        onClick={() => {
          dispatch({
            type: "OPEN_MODAL",
            payload: { for: "change size", id: 2 },
          });
        }}
      >
        <VscSymbolArray />
      </button>
      <button
        className={`${
          AppState.isBannerOpen ? "banner-open" : ""
        } flex-center btn algo`}
        aria-label="algorithm"
        onClick={() => {
          dispatch({
            type: "OPEN_MODAL",
            payload: { for: "choose algorithm", id: 3 },
          });
        }}
      >
        <FaSitemap />
      </button>
      <button
        className="flex-center btn"
        aria-label="play/pause"
        onClick={() => {
          d3.select("#bar-1")
            .transition()
            .delay(1000)
            .duration(2000)
            .attr("x", 100)
            .on("end", () => {
              console.log("hello");
            });
          dispatch({
            type: "PLAY",
          });
        }}
      >
        {AppState.isPlay ? <FaPauseCircle /> : <FaPlayCircle />}
      </button>
    </aside>
  );
};

export default Aside;
