import compilationOptions from "../../compilationOptions";

import React from "react";

import "./checkbox-list.scss";

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    /* this.outerContainerElement = outerContainerElement; */
    /* this.state.isClosed = props.isClosed; */
    this.state = { isClosed: true };

    this._handleCheckboxExpand = this._handleCheckboxExpand.bind(this);

    /* this._initialize(); */
  }

  /* _initialize() { */
  /* this.containerElement = this.outerContainerElement.querySelector('.js-checkbox-list');
  this.dropdownButton = this.containerElement.querySelector('.js-checkbox-list__title');
  this.list = this.containerElement.querySelector('.js-checkbox-list__list');
  this.dropdownArrow = this.containerElement.querySelector('.js-checkbox-list__dropdown-arrow'); */

  /* this.dropdownButton.addEventListener('click', this._handleCheckboxExpand); */

  /* this._updateState(); */
  /* } */

  /* _updateState() {
    if (this.isClosed) {
      this.list.classList.toggle('checkbox-list__list_closed', true);
      this.dropdownArrow.classList.toggle('checkbox-list__dropdown-arrow_closed', true);
    } else {
      this.list.classList.toggle('checkbox-list__list_closed', false);
      this.dropdownArrow.classList.toggle('checkbox-list__dropdown-arrow_closed', false);
    }
  } */

  _handleCheckboxExpand() {
    /* if (this.isClosed) this.isClosed = false;
    else this.isClosed = true;
    this._updateState(); */
    const state = {
      isClosed: !this.state.isClosed,
    };
    this.setState(state);
  }

  render() {
    const {
      inputClick,
      title = "сортировать по:",
      isExpandable = true,
      isOpened = false,
      hasAdditionalText = false,
      list = [
        { isChecked: false, text: "Цена", name: "price" },
        { isChecked: true, text: "Отзывы", name: "reviewsCount" },
        { isChecked: true, text: "Имени", name: "name" },
      ],
    } = this.props;
    const { isClosed = true } = this.state;
    const containerClasses = [];
    const itemTextClasses = [];

    if (isExpandable) containerClasses.push("checkbox-list_type_expandable");
    else if (hasAdditionalText) containerClasses.push("checkbox-list_type_rich");
    if (hasAdditionalText) itemTextClasses.push(`checkbox-list__item-text_complex`);

    return (
      <div className={["checkbox-list"].concat(containerClasses).join(" ")}>
        {title ?
          <p className="checkbox-list__title" onClick={this._handleCheckboxExpand}>
            <span className="checkbox-list__title-text">{title}</span>
            {isExpandable ?
              <span className={`checkbox-list__dropdown-arrow ${isClosed ? "checkbox-list__dropdown-arrow_closed" : ""}`}>expand_more</span>
              : null
            }
          </p>
          : null
        }
        <ul className={`checkbox-list__list ${isClosed ? "checkbox-list__list_closed" : ""}`}>
          {list.map((item, index) => {
            return (
              <li className="checkbox-list__item" key={`checkbox-list__item_${index}`}>
                <label className="checkbox-list__label">
                  <input className="checkbox-list__input"
                    type="checkbox"
                    name={`checkbox-list_${item.name}`}
                    defaultChecked={item.isChecked}
                    onClick={inputClick ? inputClick : () => { }}></input>
                  <div className="checkbox-list__check-mark">
                    <img className="checkbox-list__check-mark-image"
                      src={`${compilationOptions.forGithubPages ? "/ProductSupermarket" : ""}/src/components/checkbox-list/img/check-mark.svg`}
                      alt="check-mark"></img>
                  </div>
                  <div className="checkbox-list__frame"></div>
                  <p className={["checkbox-list__item-text"].concat(itemTextClasses).join(" ")}>{item.text}</p>
                </label>
                {hasAdditionalText ?
                  <p className="checkbox-list__item-additional-text">{item.additionalText}</p>
                  : null
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CheckboxList;
