import React, { useContext } from "react";
import AppContext from "../../app/AppContext";
const Size = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "ADD_SIZE",
      payload: parseInt(e.currentTarget.value),
    });
  };
  return (
    <article className="modal__content flex-center">
      <div className="flex-center range-container">
        <output className="bubble flex-center">{AppState.size}</output>
        <input
          type="range"
          min="10"
          value={AppState.size}
          onChange={handleOnChange}
          max={`${
            AppState.svg.width < 776 && AppState.svg.height < 776 ? 50 : 100
          }`}
          className="range"
        />
      </div>
    </article>
  );
};

export default Size;
