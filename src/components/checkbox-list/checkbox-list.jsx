import React from 'react';
import compilationOptions from '../../compilationOptions';
import './checkbox-list.scss';

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClosed: true };

    this._handleCheckboxExpand = this._handleCheckboxExpand.bind(this);
  }

  _handleCheckboxExpand() {
    const { isClosed } = this.state;
    const state = {
      isClosed: !isClosed,
    };
    this.setState(state);
  }

  render() {
    const {
      inputClick,
      title = 'сортировать по:',
      isExpandable = true,
      isOpened = false,
      hasAdditionalText = false,
      list = [
        { isChecked: false, text: 'Цена', name: 'price' },
        { isChecked: true, text: 'Отзывы', name: 'reviewsCount' },
        { isChecked: true, text: 'Имени', name: 'name' },
      ],
    } = this.props;
    const { isClosed = true } = this.state;
    const containerClasses = [];
    const itemTextClasses = [];

    if (isExpandable) containerClasses.push('checkbox-list_type_expandable');
    else if (hasAdditionalText) containerClasses.push('checkbox-list_type_rich');
    if (hasAdditionalText) itemTextClasses.push('checkbox-list__item-text_complex');

    return (
      <div className={['checkbox-list'].concat(containerClasses).join(' ')}>
        {title ? (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <p
            className='checkbox-list__title'
            onClick={this._handleCheckboxExpand}
          >
            <span className='checkbox-list__title-text'>{title}</span>
            {isExpandable ? (
              <span
                className={`checkbox-list__dropdown-arrow ${
                  isClosed ? 'checkbox-list__dropdown-arrow_closed' : ''}`}
              >
                expand_more
              </span>
            ) : null}
          </p>
        ) : null}
        <ul
          className={`checkbox-list__list ${
            isClosed ? 'checkbox-list__list_closed' : ''}`}
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
                  name={`checkbox-list_${item.name}`}
                  defaultChecked={item.isChecked}
                  onClick={inputClick || (() => { })}
                />
                <div className='checkbox-list__check-mark'>
                  <img
                    className='checkbox-list__check-mark-image'
                    src={`${compilationOptions.forGithubPages ? '/ProductSupermarket' : ''}/src/components/checkbox-list/img/check-mark.svg`}
                    alt='check-mark'
                  />
                </div>
                <div className='checkbox-list__frame' />
                <p
                  className={['checkbox-list__item-text']
                    .concat(itemTextClasses)
                    .join(' ')}
                >
                  {item.text}
                </p>
              </label>
              {hasAdditionalText ? (
                <p className='checkbox-list__item-additional-text'>
                  {item.additionalText}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CheckboxList;
