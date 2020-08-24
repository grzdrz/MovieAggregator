import React from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button.jsx";

import "./update-form.scss";

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="update-form">
        <div className="update-form__number">
          <FormInput
            title="Room number"
            additionalTitle=""
            placeholder="Room number"
            name="room-number"
            type="number"
            hasSubmitButton={false}
          />
        </div>
        <div className="update-form__status">
          <FormInput />
        </div>
        <div className="update-form__price">
          <FormInput />
        </div>
        <div className="update-form__reviews-count">
          <FormInput />
        </div>
        <div className="update-form__checked-star-index">
          <FormInput />
        </div>
        <div className="update-form__submit-button">
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

export default UpdateForm;
