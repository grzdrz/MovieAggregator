import React from 'react';
import PropTypes from 'prop-types';
import './form-input.scss';

function FormInput(props) {
  const {
    title,
    additionalTitle,
    placeholder,
    name,
    type,
    value,
    hasSubmitButton,
  } = props;

  return (
    <div className='form-input'>
      {title
        ? (
          <p className='form-input__title'>
            <span className='form-input__title-text'>{title}</span>
            {additionalTitle ? <span className='form-input__additional-title-text'>{additionalTitle}</span> : null}
          </p>
        ) : null}
      <div className='form-input__input-container'>
        <input
          className='form-input__input'
          placeholder={placeholder}
          name={name}
          type={type}
          defaultValue={value}
        />
        {hasSubmitButton
          ? (
            <input
              className='form-input__submitter'
              type='submit'
              value='arrow_forward'
            />
          ) : null}
      </div>
    </div>
  );
}

FormInput.propTypes = {
  title: PropTypes.string,
  additionalTitle: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  hasSubmitButton: PropTypes.bool,
};

FormInput.defaultProps = {
  title: '',
  additionalTitle: '',
  placeholder: 'Email',
  name: 'email',
  type: 'email',
  value: '',
  hasSubmitButton: false,
};

export default FormInput;
