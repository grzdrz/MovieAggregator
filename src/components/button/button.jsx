import React from 'react';
import { NavLink } from 'react-router-dom';
import './button.scss';

function Button(props) {
  const { isHollow, hasArrow, buttonType, text, url, handleClick } = props;
  const containerClasses = isHollow ? ['button_hollow'] : [];

  const handleButtonClick = (event) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <div className={['button'].concat(containerClasses).join(' ')}>
      {buttonType === 'a' ? (
        <a
          className='button__basis'
          href={url || 'https://errorpage.com'}
          target={url ? '_blank' : ''}
          rel={url ? 'noopener noreferrer' : ''}
          onClick={handleClick ? handleButtonClick : () => { }}
        >
          <span className='button__text'>{text}</span>
          {hasArrow ? (
            <span className='button__arrow'>arrow_forward</span>
          ) : null}
        </a>
      ) : buttonType === 'button' ? (
        <button
          className='button__basis'
          type='button'
          onClick={handleClick ? handleButtonClick : () => { }}
        >
          <span className='button__text'>{text}</span>
          {hasArrow ? (
            <span className='button__arrow'>arrow_forward</span>
          ) : null}
        </button>
      ) : buttonType === 'submit' ? (
        <label className='button__basis'>
          <input
            className='button__submit'
            type='submit'
            onClick={handleClick ? handleButtonClick : () => { }}
          />
          <span className='button__text'>{text}</span>
          {hasArrow ? (
            <span className='button__arrow'>arrow_forward</span>
          ) : null}
        </label>
      ) : buttonType === 'nav' ? (
        <NavLink className='button__basis' to={url}>
          <span className='button__text'>{text}</span>
          {hasArrow ? (
            <span className='button__arrow'>arrow_forward</span>
          ) : null}
        </NavLink>
      ) : null}
    </div>
  );
}

export default Button;
