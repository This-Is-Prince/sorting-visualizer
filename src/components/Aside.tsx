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
    if (!checkEvent(event)) return;
    if (AppState.whichAlgorithm === "") {
      dispatch({
        type: "OPEN_MODAL",
        payload: { for: "choose algorithm", id: 3 },
      });
      return;
    }
    if (AppState.bars.length === 0) {
      dispatch({
        type: "OPEN_MODAL",
        payload: { for: "change array", id: 2 },
      });
      return;
    }
    if (!AppState.isSortDone) {
      dispatch({
        type: "PLAY",
        payload: true,
      });
    } else {
      dispatch({
        type: "OPEN_MODAL",
        payload: { for: "change array", id: 2 },
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
        className={`flex-center btn`}
        aria-label="array"
        onClick={(event) => {
          if (checkEvent(event)) {
            dispatch({
              type: "OPEN_MODAL",
              payload: { for: "change array", id: 2 },
            });
          }
        }}
      >
        <VscSymbolArray />
      </button>
      <button
        className={`flex-center btn algo`}
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
