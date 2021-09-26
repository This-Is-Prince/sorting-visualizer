import React, { useContext } from "react";
import AppContext from "../../app/AppContext";

const Algorithm = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "ADD_ALGORITHM",
      payload: e.currentTarget.value,
    });
  };
  return (
    <article className="modal__content">
      <div className="choose">
        <input
          type="radio"
          aria-label="bubble"
          name="algorithm"
          value="bubble"
          className="radio flex-center"
          onChange={handleOnChange}
        />
        <p className="flex-center">Bubble sort</p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="merge"
          name="algorithm"
          value="merge"
          className="radio flex-center"
          onChange={handleOnChange}
        />
        <p className="flex-center">merge sort</p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="heap"
          name="algorithm"
          value="heap"
          className="radio flex-center"
          onChange={handleOnChange}
        />
        <p className="flex-center">heap sort</p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="quick"
          name="algorithm"
          value="quick"
          className="radio flex-center"
          onChange={handleOnChange}
        />
        <p className="flex-center">quick sort</p>
      </div>
    </article>
  );
};

export default Algorithm;
