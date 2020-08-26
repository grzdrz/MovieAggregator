import React from "react";
import CreateForm from "../create-form/create-form";

import "./create-button.scss";

class CreateButton extends React.Component {
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
      updateForm.classList.toggle('create-button__update-form_opened', true);
      plusButton.classList.toggle('create-button__button-container_opened', false);
    } else {
      updateForm.classList.toggle('create-button__update-form_opened', false);
      plusButton.classList.toggle('create-button__button-container_opened', true);
    }
  }

  _handleDropdownLeave = (event) => {
    if (event.target.className.match) {
      const updateForm = event.target.className.match(/(^create-button)|(^create-button__)|(^update-form)|(^form-input)/);
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
      <div className="create-button">
        <div className="create-button__button-container" onClick={this._handlePlusWindowClick} ref={this.plusButton}>
          <span className="create-button__text">Создать элемент</span>
        </div>
        <div className="create-button__update-form" ref={this.updateForm}>
          <CreateForm createItem={this.props.createItem}/>
        </div>
      </div>
    );
  }
}

export default CreateButton;