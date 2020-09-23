import React from 'react';
import PropTypes from 'prop-types';
import './radio.scss';

function Radio(props) {
  const {
    id,
    title,
    buttonsList,
    name,
  } = props;

  return (
    <div className='radio'>
      <p className='radio__title'>{title}</p>
      <div className='radio__inputs'>
        {buttonsList.map((button) => (
          <label className='radio__label' key={`radio__label_${button.text}`}>
            <input
              className='radio__input'
              type='radio'
              name={`${name}-${id}`}
              defaultChecked={button.isChecked}
            />
            <div className='radio__button-image' />
            <p className='radio__text'>{button.text}</p>
          </label>
        ))}
      </div>
    </div>
  );
}

Radio.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  buttonsList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      isChecked: PropTypes.bool,
    }),
  ),
  name: PropTypes.string,
};

Radio.defaultProps = {
  id: 0,
  title: '',
  buttonsList: [
    { text: 'amount', isChecked: true },
    { text: 'weight', isChecked: false },
  ],
  name: 'packaging',
};

export default Radio;
