/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import compilationOptions from '../../compilationOptions';
import './checkbox-list.scss';

function CheckboxList(props) {
  const {
    inputClick,
    title,
    isExpandable,
    hasAdditionalText,
    list,
  } = props;

  const [isClosed, setIsClosed] = useState(props.isClosed);

  const handleCheckboxExpand = () => {
    setIsClosed(!isClosed);
  };

  const containerClasses = [];
  const itemTextClasses = [];

  if (isExpandable) containerClasses.push('checkbox-list_type_expandable');
  else if (hasAdditionalText) containerClasses.push('checkbox-list_type_rich');
  if (hasAdditionalText) itemTextClasses.push('checkbox-list__item-text_complex');

  return (
    <div className={`checkbox-list ${containerClasses}`}>
      {title ? (
        <p
          className='checkbox-list__title'
          onClick={handleCheckboxExpand}
        >
          <span className='checkbox-list__title-text'>{title}</span>
          {isExpandable ? (
            <span
              className={`checkbox-list__dropdown-arrow ${isClosed ? 'checkbox-list__dropdown-arrow_closed' : ''}`}
            >
              expand_more
            </span>
          ) : null}
        </p>
      ) : null}
      <ul
        className={`checkbox-list__list ${isClosed ? 'checkbox-list__list_closed' : ''}`}
      >
        {list.map((item) => (
          <li
            className='checkbox-list__item'
            key={`checkbox-list__item_${item.name}`}
          >
            <label className='checkbox-list__label'>
              <input
                className='checkbox-list__input'
                type='checkbox'
                name={`checkbox-list_${item.type}_${item.name}`}
                defaultChecked={item.isChecked}
                onClick={inputClick}
              />
              <div className='checkbox-list__check-mark'>
                <img
                  className='checkbox-list__check-mark-image'
                  src={`${compilationOptions.forGithubPages ? '/ProductSupermarket' : ''}/src/components/checkbox-list/images/check-mark.svg`}
                  alt='check-mark'
                />
              </div>
              <div className='checkbox-list__frame' />
              <p className={`checkbox-list__item-text ${itemTextClasses}`}>{item.text}</p>
            </label>
            {hasAdditionalText ? (
              <p className='checkbox-list__item-additional-text'>{item.additionalText}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

CheckboxList.propTypes = {
  inputClick: PropTypes.func,
  title: PropTypes.string,
  isExpandable: PropTypes.bool,
  isClosed: PropTypes.bool,
  hasAdditionalText: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool,
      text: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
};

CheckboxList.defaultProps = {
  inputClick: () => { },
  title: '',
  isExpandable: true,
  isClosed: false,
  hasAdditionalText: false,
  list: [
    { isChecked: false, text: 'Цена', name: 'price', type: 'sorter' },
  ],
};

export default CheckboxList;
