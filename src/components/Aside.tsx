import React, { useContext } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { VscSymbolArray } from "react-icons/vsc";
import { FaPauseCircle, FaPlayCircle, FaSitemap } from "react-icons/fa";
import AppContext from "../app/AppContext";
import Sort from "../algorithm/sort";

const Aside = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handlePlay = () => {
    if (AppState.whichAlgorithm === "") {
      dispatch({
        type: "SELECT_ALGORITHM",
      });
      return;
    }
    if (AppState.bars.length === 0) {
      dispatch({
        type: "SELECT_ARRAY",
      });
      return;
    }
    Sort(AppState.whichAlgorithm, 0, AppState.bars);
    dispatch({
      type: "PLAY",
    });
  };
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
        className={`flex-center btn ${
          AppState.isSizeBannerOpen ? "banner-open" : ""
        }`}
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
          AppState.isAlgoBannerOpen ? "banner-open" : ""
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
        onClick={handlePlay}
      >
        {AppState.isPlay ? <FaPauseCircle /> : <FaPlayCircle />}
      </button>
    </aside>
  );
};

export default Aside;
