import React from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button.jsx";

import "./create-form.scss";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    const formBody = new FormData(this.form.current);
    const test = Array.from(formBody);
    const test2 = Object.fromEntries(test);
    this.props.createItem(test2);
  }

  render() {
    return (
      <form className="create-form" ref={this.form} onSubmit={this._handleSubmit}>
        <div className="create-form__number">
          <FormInput name="number" type="number" />
        </div>
        <div className="create-form__status">
          <FormInput name="status" type="text" />
        </div>
        <div className="create-form__price">
          <FormInput name="price" type="number" />
        </div>
        <div className="create-form__reviews-count">
          <FormInput name="reviewsCount" type="number" />
        </div>
        <div className="create-form__checked-star-index">
          <FormInput name="checkedStarIndex" type="number" />
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
