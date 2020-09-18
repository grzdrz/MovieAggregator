import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './button.scss';

function Button(props) {
  const {
    isHollow,
    forHeader,
    hasArrow,
    basisType,
    text,
    url,
    handleClick,
  } = props;

  const handleButtonClick = (event) => {
    if (handleClick) {
      event.preventDefault();
      handleClick();
    }
  };

  const buttonInsides = (
    <>
      {hasArrow ? (
        <span className='button__arrow'>arrow_forward</span>
      ) : null}
      <span className={`button__text ${forHeader ? 'button__text_in-header' : ''}`}>{text}</span>
    </>
  );

  return (
    <div className={`button ${isHollow ? 'button_hollow' : ''}`}>
      {basisType === 'a' ? (
        <a
          className='button__basis'
          href={url || 'https://errorpage.com'}
          target='_blank'
          rel='noopener noreferrer'
          onClick={handleButtonClick}
        >
          {buttonInsides}
        </a>
      ) : basisType === 'button' ? (
        <button
          className='button__basis'
          type='button'
          onClick={handleButtonClick}
        >
          {buttonInsides}
        </button>
      ) : basisType === 'submit' ? (
        <label className='button__basis'>
          <input
            className='button__submit'
            type='submit'
            onClick={handleButtonClick}
          />
          {buttonInsides}
        </label>
      ) : basisType === 'nav' ? (
        <NavLink className='button__basis' to={url}>
          {buttonInsides}
        </NavLink>
      ) : null}
    </div>
  );
}

Button.propTypes = {
  isHollow: PropTypes.bool,
  forHeader: PropTypes.bool,
  hasArrow: PropTypes.bool,
  basisType: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  isHollow: false,
  forHeader: false,
  hasArrow: false,
  basisType: 'button',
  text: '',
  url: '',
  handleClick: undefined,
};

export default Button;
