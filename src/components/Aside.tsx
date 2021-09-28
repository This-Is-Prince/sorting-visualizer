import React, { useContext, useEffect } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { VscSymbolArray } from "react-icons/vsc";
import { FaPauseCircle, FaPlayCircle, FaSitemap } from "react-icons/fa";
import AppContext from "../app/AppContext";

const Aside = () => {
  const checkEvent = (event: React.MouseEvent) => {
    if (AppState.isPlay) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    return true;
  };
  const { AppState, dispatch } = useContext(AppContext);
  const handlePlay = (event: React.MouseEvent) => {
    if (
      !checkEvent(event) ||
      AppState.whichAlgorithm === "" ||
      AppState.bars.length === 0
    )
      return;

    if (!AppState.isSortDone) {
      dispatch({
        type: "PLAY",
        payload: true,
      });
    }
  };
  return (
    <aside className="aside">
      <button
        className="flex-center btn"
        aria-label="speed"
        onClick={(event) => {
          if (checkEvent(event)) {
            dispatch({
              type: "OPEN_MODAL",
              payload: { for: "change speed", id: 1 },
            });
          }
        }}
      >
        <IoMdSpeedometer />
      </button>
      <button
        className={`flex-center btn ${
          AppState.bars.length === 0 ? "banner-open" : ""
        }`}
        aria-label="size"
        onClick={(event) => {
          if (checkEvent(event)) {
            dispatch({
              type: "OPEN_MODAL",
              payload: { for: "change size", id: 2 },
            });
          }
        }}
      >
        <VscSymbolArray />
      </button>
      <button
        className={`${
          AppState.whichAlgorithm === "" ? "banner-open" : ""
        } flex-center btn algo`}
        aria-label="algorithm"
        onClick={(event) => {
          if (checkEvent(event)) {
            dispatch({
              type: "OPEN_MODAL",
              payload: { for: "choose algorithm", id: 3 },
            });
          }
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
