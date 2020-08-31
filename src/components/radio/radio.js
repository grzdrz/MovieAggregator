import React from "react";
import "./radio.scss";

function Radio(props) {

  const {
    id = 0,
    title = "",
    buttonsList = [
      { text: "amount", isChecked: true },
      { text: "weight", isChecked: false },
    ],
    name = "packaging",
  } = props;

  return (
    <div className="radio">
      <p className="radio__title">{title}</p>
      <div className="radio__inputs">
        {buttonsList.map((button, index) => {
          return (
            <label className="radio__label" key={`radio__label_${index}`}>
              <input className="radio__input"
                type="radio"
                name={`${name}-${id}`}
                defaultChecked={button.isChecked}></input>
              <div className="radio__button-image"></div>
              <p className="radio__text">{button.text}</p>
            </label>
          );
        })
        }
      </div>
    </div>
  );
}

export default Radio;