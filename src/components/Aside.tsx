import React, { useContext, useEffect } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { VscSymbolArray } from "react-icons/vsc";
import { FaPauseCircle, FaPlayCircle, FaSitemap } from "react-icons/fa";
import AppContext from "../app/AppContext";
import Sort from "../algorithm/sort";
import { Bar } from "../app/State";
let sortBars: Bar[];

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
  const swapDone = () => {
    dispatch({
      type: "PLAY",
      payload: false,
    });
    dispatch({
      type: "SORT_DONE",
    });
    dispatch({
      type: "ADD_BARS",
      payload: sortBars,
    });
  };
  useEffect(() => {
    window.addEventListener("swap-done", swapDone);
    return () => {
      window.removeEventListener("swap-done", swapDone);
    };
  }, []);
  const handlePlay = (event: React.MouseEvent) => {
    if (!checkEvent(event)) return;

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
    if (!AppState.isSortDone) {
      sortBars = [];
      sortBars = Sort(AppState.whichAlgorithm, AppState.speed, AppState.bars);
      dispatch({
        type: "PLAY",
        payload: true,
      });
    } else {
      dispatch({
        type: "SELECT_ARRAY",
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
          AppState.isSizeBannerOpen ? "banner-open" : ""
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
          AppState.isAlgoBannerOpen ? "banner-open" : ""
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
