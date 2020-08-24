import React from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button.jsx";

import "./create-form.scss";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="create-form">
        <div className="create-form__number">
          <FormInput />
        </div>
        <div className="create-form__status">
          <FormInput />
        </div>
        <div className="create-form__price">
          <FormInput />
        </div>
        <div className="create-form__reviews-count">
          <FormInput />
        </div>
        <div className="create-form__checked-star-index">
          <FormInput />
        </div>
        <div className="create-form__submit-button">
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

export default CreateForm;
