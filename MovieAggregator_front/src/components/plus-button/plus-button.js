import React from "react";
import UpdateForm from "../update-form/update-form";

import "./plus-button.scss";

class PlusButton extends React.Component {
  constructor(props) {
    super(props);
    this.isOpened = false;
    this.plusButton = React.createRef();
    this.updateForm = React.createRef();
  }

  componentWillMount() {
    document.addEventListener('click', this._handleDropdownLeave);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDropdownLeave);
  }

  componentDidMount() {
    this._changeState();
  }

  _changeState() {
    const updateForm = this.updateForm.current;
    const plusButton = this.plusButton.current;
    if (this.isOpened) {
      updateForm.classList.toggle('plus-button__update-form_opened', true);
      plusButton.classList.toggle('plus-button__button-container_opened', false);
    } else {
      updateForm.classList.toggle('plus-button__update-form_opened', false);
      plusButton.classList.toggle('plus-button__button-container_opened', true);
    }
  }

  _handleDropdownLeave = (event) => {
    if (event.target.className.match) {
      const updateForm = event.target.className.match(/(^plus-button)|(^plus-button__)|(^update-form)|(^form-input)/);
      if (!updateForm) {
        this._handleCloseDropdown();
      }
    } else this._handleCloseDropdown();
  }

  _handleCloseDropdown = () => {
    this.isOpened = false;
    this._changeState();
  }

  _handlePlusWindowClick = () => {
    this.isOpened = true;
    this._changeState();
  }

  render() {
    return (
      <div className="plus-button">
        <div className="plus-button__button-container" onClick={this._handlePlusWindowClick} ref={this.plusButton}>
          <span className="plus-button__horizontal-part"></span>
          <span className="plus-button__vertical-part"></span>
        </div>
        <div className="plus-button__update-form" ref={this.updateForm}>
          <UpdateForm />
        </div>
      </div>
    );
  }
}

export default PlusButton;