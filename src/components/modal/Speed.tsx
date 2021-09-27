import React, { useContext } from "react";
import { FaWalking } from "react-icons/fa";
import { GiRaceCar, GiTurtle } from "react-icons/gi";
import AppContext from "../../app/AppContext";

const Speed = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "ADD_SPEED",
      payload: e.currentTarget.value as "SLOW" | "FAST" | "NORMAL",
    });
  };
  return (
    <article className="modal__content flex-center">
      <div className="choose">
        <input
          type="radio"
          aria-label="slow"
          name="speed"
          checked={AppState.speed === "SLOW"}
          onChange={handleOnChange}
          value="SLOW"
          className="radio flex-center"
        />
        <p className="flex-center">
          <span className="flex-center">
            <GiTurtle />
          </span>
          <span>Slow</span>
        </p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="normal"
          name="speed"
          checked={AppState.speed === "NORMAL"}
          onChange={handleOnChange}
          value="NORMAL"
          className="radio flex-center"
        />
        <p className="flex-center">
          <span className="flex-center">
            <FaWalking />
          </span>
          <span>normal</span>
        </p>
      </div>
      <div className="choose">
        <input
          type="radio"
          aria-label="fast"
          name="speed"
          checked={AppState.speed === "FAST"}
          onChange={handleOnChange}
          value="FAST"
          className="radio flex-center"
        />
        <p className="flex-center">
          <span className="flex-center">
            <GiRaceCar />
          </span>
          <span>fast</span>
        </p>
      </div>
    </article>
  );
};

export default Speed;
