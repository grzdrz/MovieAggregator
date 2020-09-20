import React from 'react';
import PropTypes from 'prop-types';
import './delete-button.scss';

function DeleteButton(props) {
  const { productId, deleteItemAction } = props;

  const handleButtonClick = () => {
    if (productId < 0) return;
    deleteItemAction(productId);
  };

  return (
    <div className='delete-button'>
      <button className='delete-button__button-container' onClick={handleButtonClick} type="button">
        <span className='delete-button__horizontal-part' />
      </button>
    </div>
  );
}

DeleteButton.propTypes = {
  productId: PropTypes.number,
  deleteItemAction: PropTypes.func,
};

DeleteButton.defaultProps = {
  productId: -1,
  deleteItemAction: () => { },
};

export default DeleteButton;
