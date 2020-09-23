/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import UpdateForm from '../update-form/update-form.jsx';

import ProductType from '../../store/Products/ProductType';

import './update-button.scss';

function UpdateButton(props) {
  const {
    product,
    updateItemAction,
  } = props;

  const [isOpened, setIsOpened] = useState(false);

  const handleDropdownLeave = (event) => {
    const button = event.target.closest('.update-button');
    const submitButton = event.target.closest('.update-form__submit-button');
    if (!button || submitButton) {
      setIsOpened(false);
    }
  };

  const handlePlusWindowClick = () => {
    setIsOpened(true);
  };

  useEffect(() => {
    document.addEventListener('click', handleDropdownLeave);
    return (() => {
      document.removeEventListener('click', handleDropdownLeave);
    });
  }, []);

  return (
    <div className='update-button'>
      <div className='update-button__button-container' onClick={handlePlusWindowClick}>
        <span className='update-button__horizontal-part' />
        <span className='update-button__vertical-part' />
      </div>
      <div className={`update-button__form ${isOpened ? 'update-button__form_opened' : ''}`}>
        <UpdateForm
          product={product}
          updateItemAction={updateItemAction}
        />
      </div>
    </div>
  );
}

UpdateButton.propTypes = {
  product: ProductType,
  updateItemAction: PropTypes.func,
};

UpdateButton.defaultProps = {
  product: {},
  updateItemAction: () => { },
};

export default UpdateButton;
