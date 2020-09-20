/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect/* , useRef */ } from 'react';
import PropTypes from 'prop-types';
import CreateForm from '../create-form/create-form.jsx';
import './create-button.scss';

function CreateButton(props) {
  const { createItemAction } = props;

  const [isOpened, setIsOpened] = useState(props.isOpened);

  const handleDropdownLeave = (event) => {
    const button = event.target.closest('.create-button');
    const submitButton = event.target.closest('.create-form__submit-button');
    if (!button || submitButton) {
      setIsOpened(false);
    }
  };

  const handlePlusButtonClick = () => {
    setIsOpened(true);
  };

  useEffect(() => {
    document.addEventListener('click', handleDropdownLeave);
    return () => {
      document.removeEventListener('click', handleDropdownLeave);
    };
  }, []);

  return (
    <div className='create-button'>
      <div className={`create-button__form ${isOpened ? 'create-button__form_opened' : ''}`}>
        <CreateForm createItemAction={createItemAction} />
      </div>
      <button
        className='create-button__button-container'
        onClick={handlePlusButtonClick}
        type='button'
      >
        <span className='create-button__text'>Создать элемент</span>
      </button>
    </div>
  );
}

CreateButton.propTypes = {
  isOpened: PropTypes.bool,
  createItemAction: PropTypes.func,
};

CreateButton.defaultProps = {
  isOpened: false,
  createItemAction: () => { },
};

export default CreateButton;
