import React from 'react';
import { NavLink } from 'react-router-dom';
import './button.scss';

function Button(props) {
  const { isHollow, hasArrow, buttonType, text, url } = props;
  const containerClasses = isHollow ? ['button_hollow'] : [];

  return (
    <div className={['button'].concat(containerClasses).join(' ')}>
      {buttonType === 'a' ? (
        <a
          className='button__basis'
          href={url || 'https://errorpage.com'}
          target={url ? '_blank' : ''}
          rel={url ? 'noopener noreferrer' : ''}
        >
          <span className='button__text'>{text}</span>
          {hasArrow ? (
            <span className='button__arrow'>arrow_forward</span>
          ) : null}
        </a>
      ) : buttonType === 'button' ? (
        <button className='button__basis' type='button'>
          <span className='button__text'>{text}</span>
          {hasArrow ? (
            <span className='button__arrow'>arrow_forward</span>
          ) : null}
        </button>
      ) : buttonType === 'submit' ? (
        <label className='button__basis'>
          <input className='button__submit' type='submit' />
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
