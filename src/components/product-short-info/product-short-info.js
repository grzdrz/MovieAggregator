import compilationOptions from "../../compilationOptions";

import React from "react";
import { NavLink } from "react-router-dom";

import UpdateButton from "../update-button/update-button";
import DeleteButton from "../delete-button/delete-button";
import StarRating from "../star-rating/star-rating";
import ProductCounter from "../product-counter/product-counter";

import "./product-short-info.scss";

class ProductShortInfo extends React.Component {
  constructor(props) {
    super(props);
    this.currentPhotoIndex = props.currentPhotoIndex !== undefined ? props.currentPhotoIndex : 0;

    this.container = React.createRef();
  }

  componentDidMount() {
    const containerElement = this.container.current;
    this.arrows = containerElement.querySelector('.js-product-short-info__arrows');
    if (this.arrows) {
      this.leftArrow = this.arrows.querySelector('.js-product-short-info__arrow-back');
      this.rightArrow = this.arrows.querySelector('.js-product-short-info__arrow-forward');
    }

    this.radioButtons = Array.from(containerElement.querySelectorAll('.js-product-short-info__radio-button'));
    this.photos = Array.from(containerElement.querySelectorAll('.js-product-short-info__photo'));

    if (this.leftArrow && this.rightArrow) {
      this.leftArrow.addEventListener('click', this._handleLeftArrowClick);
      this.rightArrow.addEventListener('click', this._handleRightArrowClick);
    }

    this._update();
  }

  _move(isDirectionForward) {
    if (isDirectionForward) {
      if (this.currentPhotoIndex === this.radioButtons.length - 1) return;
      this.currentPhotoIndex += 1;
    } else {
      if (this.currentPhotoIndex === 0) return;
      this.currentPhotoIndex -= 1;
    }
  }

  _update() {
    this.radioButtons.forEach((button, index) => {
      if (index === this.currentPhotoIndex) button.classList.toggle('product-short-info__radio-button_checked', true);
      else button.classList.toggle('product-short-info__radio-button_checked', false);
    });
    this.photos.forEach((photo, index) => {
      if (index === this.currentPhotoIndex) photo.classList.toggle('product-short-info__photo_current', true);
      else photo.classList.toggle('product-short-info__photo_current', false);
    });
  }

  _handleLeftArrowClick = () => {
    this._move(false);
    this._update();
  }

  _handleRightArrowClick = () => {
    this._move(true);
    this._update();
  }

  _formateNumber(number) {
    return `${number}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }

  render() {
    const {
      id,
      name,
      price,
      currencyType,
      descriptions,
      manufacturer,
      energyValue,
      proteins,
      fats,
      carbohydrates,
      energyUnits,
      weightUnits,
      shelfLife,
      shelfLifeUnits,
      packaging,
      imageNames,
      checkedStars,
      reviewsCount,
    } = this.props.product;
    const test = compilationOptions.forGithubPages;

    return (
      <div className="product-short-info js-product-short-info" ref={this.container} >
        <NavLink className="product-short-info__ref" to={`/ProductSupermarket/pageDetails/${id}`}></NavLink>
        <div className="product-short-info__photos">
          <div className="product-short-info__radio-buttons">
            {imageNames.map((name, index) => {
              let i = index + 1;
              return (
                <p className={`product-short-info__radio-button js-product-short-info__radio-button`}
                  data-serial-number={i}
                  key={`product-short-info__radio-button-${i}`}>
                  <span className="product-short-info__radio-button-image js-product-short-info__radio-button-image"></span>
                </p>
              );
            })}
          </div>
          {imageNames.map((imageName, i) => {
            return (
              <img className={`product-short-info__photo js-product-short-info__photo`}
                key={`product-short-info__photo product-short-info__photo-${i}`}
                src={`${compilationOptions.forGithubPages ? "/ProductSupermarket" : ""}/src/data/images/products/${imageName}.jpg`}
                alt="room photo"
                data-serial-number={i}></img>
            );
          })}
          {imageNames.length > 1 ?
            <div className="product-short-info__arrows js-product-short-info__arrows">
              <button className="product-short-info__arrow-back js-product-short-info__arrow-back" onClick={this.handlerLeftArrowClick}>
                <span className="product-short-info__arrow-back-icon">expand_more</span>
              </button>
              <button className="product-short-info__arrow-forward js-product-short-info__arrow-forward" onClick={this.handlerRightArrowClick}>
                <span className="product-short-info__arrow-forward-icon">expand_more</span>
              </button>
            </div>
            : null
          }
        </div>
        <div className="product-short-info__text-info">
          <p className="product-short-info__title">
            <span className="product-short-info__name">{name}</span>
            <ProductCounter
              shoppingCart={this.props.shoppingCart}
              shoppingCartPlusAction={this.props.shoppingCartPlusAction}
              shoppingCartMinusAction={this.props.shoppingCartMinusAction}
              productId={id} />
            <span className="product-short-info__price">
              <span className="product-short-info__price-number">{`${this._formateNumber(price)}${currencyType}`}</span>
              <span className="product-short-info__packaging-type">{`за ${packaging === "amount" ? "штуку" : "килограмм"}`}</span>
            </span>
          </p>
          <div className="product-short-info__rate">
            <StarRating
              id={id}
              checkedStars={checkedStars}
            />
            <p className="product-short-info__reviews-count">
              <span className="product-short-info__reviews-count-value">{reviewsCount}</span>
              <span className="product-short-info__reviews-count-text">Отзывов</span>
            </p>
          </div>
        </div>
        <div className="product-short-info__buttons">
          <div className="product-short-info__update-button">
            <UpdateButton
              product={this.props.product}
              updateItem={this.props.updateItem} />
          </div>
          <div className="product-short-info__delete-button">
            <DeleteButton />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductShortInfo;
