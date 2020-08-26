import React from "react";
import UpdateForm from "../update-form/update-form";

import "./delete-button.scss";

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.isOpened = false;
  }

  _handleWindowClick = (event) => {

  }

  render() {
    return (
      <div className="delete-button">
        <div className="delete-button__button-container" onClick={this._handleWindowClick}>
          <span className="delete-button__horizontal-part"></span>
        </div>
      </div>
    );
  }
}

export default DeleteButton;