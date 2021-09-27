import React, { useEffect, useReducer } from "react";
import "./App.css";
import Reducer from "./app/Reducer";
import AppInitialState, { AppStateType } from "./app/State";
import Footer from "./components/Footer";
import Main from "./components/Main";
import AppContext from "./app/AppContext";
import Modal from "./components/modal/Modal";
import FullScreenModal from "./components/FullScreenModal";

const App = () => {
  const [AppState, dispatch] = useReducer(Reducer, AppInitialState);
  const checkScreen = () => {
    if (document.fullscreenElement) return;
    dispatch({
      type: "CHANGE_SCREEN",
    });
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", checkScreen);
    return () => {
      document.removeEventListener("fullscreenchange", checkScreen);
    };
  }, []);
  return (
    <AppContext.Provider value={{ AppState, dispatch }}>
      <Main />
      <Footer />
      <Modal />
      {AppState.isFullScreen && <FullScreenModal />}
    </AppContext.Provider>
  );
};

export default App;
