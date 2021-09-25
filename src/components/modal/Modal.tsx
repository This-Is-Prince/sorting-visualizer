import React, { useContext } from "react";
import { FaTimesCircle } from "react-icons/fa";
import AppContext from "../../app/AppContext";
import Algorithm from "./Algorithm";
import Size from "./Size";
import Speed from "./Speed";

const Modal = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const id = AppState.modalState.id;
  return (
    <div className="modal__container">
      <section className="modal">
        <header className="flex-center modal__header ">
          <h2>{AppState.modalState.for}</h2>
          <button
            className="btn flex-center"
            onClick={() => {
              dispatch({
                type: "CLOSE_MODAL",
              });
            }}
          >
            <FaTimesCircle />
          </button>
        </header>
        {id === 1 ? <Speed /> : id === 3 ? <Algorithm /> : <Size />}
      </section>
    </div>
  );
};

export default Modal;
