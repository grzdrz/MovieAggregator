import React from "react";
import Button from "../button/button.jsx";

import "./crud-forms-links.scss";

class CrudFormsLinks extends React.Component {
  constructor(props) {
    super(props);
    this.isOpened = false;
    this.plusButton = React.createRef();
    this.linksContainer = React.createRef();
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

  _handleDropdownLeave = (event) => {
    if (event.target.className.match) {
      const linksContainer = event.target.className.match(/(^crud-forms-links$)|(^crud-forms-links__)/);
      if (!linksContainer) {
        this._handleCloseDropdown();
      }
    } else this._handleCloseDropdown();
  }

  _changeState() {
    const linksContainer = this.linksContainer.current;
    const plusButton = this.plusButton.current;
    if (this.isOpened) {
      linksContainer.classList.toggle('crud-forms-links__links-to-forms_opened', true);
      plusButton.classList.toggle('crud-forms-links__plus-button_opened', false);
    } else {
      linksContainer.classList.toggle('crud-forms-links__links-to-forms_opened', false);
      plusButton.classList.toggle('crud-forms-links__plus-button_opened', true);
    }
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
      <div className="crud-forms-links">
        <div className="crud-forms-links__plus-button" onClick={this._handlePlusWindowClick} ref={this.plusButton}>
          <span className="crud-forms-links__plus-horizontal-part"></span>
          <span className="crud-forms-links__plus-vertical-part"></span>
        </div>
        <div className="crud-forms-links__links-to-forms" ref={this.linksContainer}>
          <div className="crud-forms-links__link">
            <Button
              buttonType="nav"
              text="create"
              url={`/page/createItem`} />
          </div>
          <div className="crud-forms-links__link">
            <Button
              buttonType="nav"
              text="update"
              url={`/page/updateItem`} />
          </div>
        </div>
      </div>
    );
  }
}

export default CrudFormsLinks;