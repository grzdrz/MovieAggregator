import React from "react";
import UpdateForm from "../update-form/update-form";

import "./update-button.scss";

class UpdateButton extends React.Component {
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
      updateForm.classList.toggle('update-button__form_opened', true);
      /* plusButton.classList.toggle('update-button__button-container_opened', false); */
    } else {
      updateForm.classList.toggle('update-button__form_opened', false);
      /* plusButton.classList.toggle('update-button__button-container_opened', true); */
    }
  }

  _handleDropdownLeave = (event) => {
    if (event.target.className.match) {
      const updateForm = event.target.className.match(
        /(^update-button)|(^update-button__)|(^update-form)|(^form-input)|(^radio)/
      );
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
      <div className="update-button">
        <div className="update-button__button-container" onClick={this._handlePlusWindowClick} ref={this.plusButton}>
          <span className="update-button__horizontal-part"></span>
          <span className="update-button__vertical-part"></span>
        </div>
        <div className="update-button__form" ref={this.updateForm}>
          <UpdateForm
            product={this.props.product}
            updateItem={this.props.updateItem} />
        </div>
      </div>
    );
  }
}

export default UpdateButton;