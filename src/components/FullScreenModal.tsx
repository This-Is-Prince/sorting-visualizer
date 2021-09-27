import React, { useContext } from "react";
import AppContext from "../app/AppContext";

const FullScreenModal = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handleFullScreen = () => {
    const fullScreenCheck = () => {
      if (document.fullscreenElement) return;
      return document.documentElement.requestFullscreen();
    };
    dispatch({
      type: "CHANGE_SCREEN",
    });
    const rotate = async () => {
      try {
        await fullScreenCheck();
        if (
          screen.orientation.type !== "landscape-secondary" &&
          screen.orientation.type !== "landscape-primary"
        ) {
          await screen.orientation.lock("landscape");
        }
      } catch (error) {
        console.log(error);
      }
    };
    rotate();
  };
  return (
    <div className="full-screen-modal flex-center">
      <button className="btn" onClick={handleFullScreen}>
        Full Screen
      </button>
    </div>
  );
};

export default FullScreenModal;
