import React from 'react';
import './delete-button.scss';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.isOpened = false;
  }

  _handleButtonClick = () => {
    const { deleteItemAction, productId } = this.props;

    deleteItemAction(productId);
  }

  render() {
    return (
      <div className='delete-button'>
        <button className='delete-button__button-container' onClick={this._handleButtonClick} type="button">
          <span className='delete-button__horizontal-part' />
        </button>
      </div>
    );
  }
}

export default DeleteButton;
