import React from "react";
import FormInput from "../form-input/form-input";
import button from "../button/button.jsx";

import "./create-item-form.scss";

class CreateItemForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="create-item-form">
        <div className="create-item-form__number">
          <FormInput />
        </div>
        <div className="create-item-form__status">
          <FormInput />
        </div>
        <div className="create-item-form__price">
          <FormInput />
        </div>
        <div className="create-item-form__reviews-count">
          <FormInput />
        </div>
        <div className="create-item-form__checked-star-index">
          <FormInput />
        </div>
        <div className="create-item-form__submit-button">
          <Button
            hasArrow={true}
            buttonType="submit"
            text="Отправить"
          />
        </div>
      </form>
    );
  }
}