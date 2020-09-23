import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import UpdateButton from '../update-button/update-button.jsx';
import DeleteButton from '../delete-button/delete-button.jsx';
import StarRating from '../star-rating/star-rating.jsx';
import ProductCounter from '../product-counter/product-counter.jsx';

import ChosenProductsType from '../../store/ShoppingCart/ChosenProductsType';
import ProductType from '../../store/Products/ProductType';
import defaultShoppingCart from '../../store/ShoppingCart/initialState';

import compilationOptions from '../../compilationOptions';

import './product-short-info.scss';

function ProductShortInfo(props) {
  const {
    chosenProducts,
    product,
    shoppingCartPlusAction,
    shoppingCartMinusAction,
    updateItemAction,
    deleteItemAction,
    cookie,
  } = props;
  const {
    id,
    name,
    price,
    currencyType,
    /* descriptions,
    manufacturer,
    energyValue,
    proteins,
    fats,
    carbohydrates,
    energyUnits,
    weightUnits,
    shelfLife,
    shelfLifeUnits, */
    packaging,
    imageNames,
    checkedStars,
    reviewsCount,
  } = product;

  const [checkedImageIndex, setCheckedImageIndex] = useState(0);

  const skipImage = (isDirectionForward) => {
    let currentPhotoIndex = checkedImageIndex;
    if (isDirectionForward) {
      if (currentPhotoIndex === imageNames.length - 1) return;
      currentPhotoIndex += 1;
    } else {
      if (currentPhotoIndex === 0) return;
      currentPhotoIndex -= 1;
    }

    setCheckedImageIndex(currentPhotoIndex);
  };

  const handleLeftArrowClick = () => {
    skipImage(false);
  };

  const handleRightArrowClick = () => {
    skipImage(true);
  };

  const _formateNumber = (number) => `${number}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

  return (
    <div className='product-short-info'>
      <NavLink className='product-short-info__ref' to={`/ProductSupermarket/pageDetails/${id}`} />
      <div className='product-short-info__photos'>
        <div className='product-short-info__radio-buttons'>
          {imageNames.map((imageName, index) => (
            <p
              className={`product-short-info__radio-button ${checkedImageIndex === index ? 'product-short-info__radio-button_checked' : ''}`}
              key={`product-short-info__radio-button-${imageName + index}`}
            >
              <span className='product-short-info__radio-button-image' />
            </p>
          ))}
        </div>
        {imageNames.length > 0
          ? imageNames.map((imageName, index) => (
            <img
              className={`product-short-info__photo ${checkedImageIndex === index ? 'product-short-info__photo_current' : ''}`}
              key={`product-short-info__photo product-short-info__photo-${imageName}`}
              src={`${compilationOptions.forGithubPages ? '/ProductSupermarket' : ''}/src/data/images/products/${imageName}.jpg`}
              alt={imageName}
            />
          ))
          : (
            <img
              className='product-short-info__photo'
              key='product-short-info__photo product-short-info__photo-no-image'
              src={`${compilationOptions.forGithubPages ? '/ProductSupermarket' : ''}/src/data/images/products/no-image.jpg`}
              alt="нет изображения"
            />
          )}
        {imageNames.length > 1
          ? (
            <div className='product-short-info__arrows'>
              <button
                className='product-short-info__arrow-back'
                onClick={handleLeftArrowClick}
                type='button'
              >
                <span className='product-short-info__arrow-back-icon'>expand_more</span>
              </button>
              <button
                className='product-short-info__arrow-forward'
                onClick={handleRightArrowClick}
                type='button'
              >
                <span className='product-short-info__arrow-forward-icon'>expand_more</span>
              </button>
            </div>
          ) : null}
      </div>
      <div className='product-short-info__text-info'>
        <div className='product-short-info__title'>
          <span className='product-short-info__name'>{name}</span>
          <ProductCounter
            chosenProducts={chosenProducts}
            shoppingCartPlusAction={shoppingCartPlusAction}
            shoppingCartMinusAction={shoppingCartMinusAction}
            productId={id}
          />
          <span className='product-short-info__price'>
            <span className='product-short-info__price-number'>{`${_formateNumber(price)}${currencyType}`}</span>
            <span className='product-short-info__packaging-type'>{`за ${packaging === 'amount' ? 'штуку' : 'килограмм'}`}</span>
          </span>
        </div>
        <div className='product-short-info__rate'>
          <StarRating
            id={id}
            checkedStars={checkedStars}
          />
          <p className='product-short-info__reviews-count'>
            <span className='product-short-info__reviews-count-value'>{reviewsCount}</span>
            <span className='product-short-info__reviews-count-text'>Отзывов</span>
          </p>
        </div>
      </div>
      {cookie
        ? (
          <div className='product-short-info__buttons'>
            <div className='product-short-info__update-button'>
              <UpdateButton
                product={product}
                updateItemAction={updateItemAction}
              />
            </div>
            <div className='product-short-info__delete-button'>
              <DeleteButton
                productId={product.id}
                deleteItemAction={deleteItemAction}
              />
            </div>
          </div>
        )
        : null}
    </div>
  );
}

ProductShortInfo.propTypes = {
  chosenProducts: ChosenProductsType,
  product: ProductType,
  shoppingCartPlusAction: PropTypes.func,
  shoppingCartMinusAction: PropTypes.func,
  updateItemAction: PropTypes.func,
  deleteItemAction: PropTypes.func,
  cookie: PropTypes.string,
};

ProductShortInfo.defaultProps = {
  chosenProducts: defaultShoppingCart.chosenProducts,
  product: {},
  shoppingCartPlusAction: () => { },
  shoppingCartMinusAction: () => { },
  updateItemAction: () => { },
  deleteItemAction: () => { },
  cookie: '',
};

export default ProductShortInfo;
