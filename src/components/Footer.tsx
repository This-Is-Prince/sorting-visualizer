import React, { useContext } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { VscSymbolArray } from "react-icons/vsc";
import { FaPauseCircle, FaPlayCircle, FaSitemap } from "react-icons/fa";
import AppContext from "../app/AppContext";

const Footer = () => {
  const { AppState, dispatch } = useContext(AppContext);
  return (
    <footer className="footer">
      <button
        className="flex-center btn"
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
        className="flex-center btn algo"
        onClick={() => {
          dispatch({
            type: "OPEN_MODAL",
            payload: { for: "choose algorithm", id: 3 },
          });
        }}
      >
        <FaSitemap />
        <span className="algo__banner">Choose Algorithm</span>
      </button>
      <button
        className="flex-center btn"
        onClick={() => {
          dispatch({
            type: "PLAY",
          });
        }}
      >
        {AppState.isPlay ? <FaPauseCircle /> : <FaPlayCircle />}
      </button>
    </footer>
  );
};

export default Footer;
