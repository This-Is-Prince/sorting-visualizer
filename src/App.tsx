import React, { useReducer } from "react";
import "./App.css";
import Reducer from "./app/Reducer";
import AppInitialState, { AppStateType } from "./app/State";
import Header from "./components/Footer";
import Main from "./components/Main";
import AppContext from "./app/AppContext";
import Modal from "./components/modal/Modal";

const App = () => {
  const [AppState, dispatch] = useReducer(Reducer, AppInitialState);
  return (
    <AppContext.Provider value={{ AppState, dispatch }}>
      <Main />
      <Header />
      <Modal />
    </AppContext.Provider>
  );
};

export default App;
