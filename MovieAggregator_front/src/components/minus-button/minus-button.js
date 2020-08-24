import React from "react";
import UpdateForm from "../update-form/update-form";

import "./minus-button.scss";

class MinusButton extends React.Component {
  constructor(props) {
    super(props);
    this.isOpened = false;
  }

  _handleWindowClick = (event) => {

  }

  render() {
    return (
      <div className="minus-button">
        <div className="minus-button__button-container" onClick={this._handleWindowClick}>
          <span className="minus-button__horizontal-part"></span>
        </div>
      </div>
    );
  }
}

export default MinusButton;