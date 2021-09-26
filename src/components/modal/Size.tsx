import React, { useContext } from "react";
import AppContext from "../../app/AppContext";

const Size = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    dispatch({
      type: "ADD_SIZE",
      payload: value,
    });
  };
  return (
    <article className="modal__content">
      <div className="flex-center range-container">
        <output className="bubble flex-center">{AppState.size}</output>
        <input
          type="range"
          min="10"
          value={AppState.size}
          onChange={handleOnChange}
          max="200"
          className="range"
        />
      </div>
    </article>
  );
};

export default Size;
