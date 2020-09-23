/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

import ProductsType from '../../store/Products/ProductsType';
import defaultProducts from '../../store/Products/initialState';

import './product-details.scss';

function ProductDetails(props) {
  const {
    productId,
    products,
  } = props;
  const product = products.allProducts.find((item) => item.id === productId);
  const {
    /* id, */
    name,
    price,
    currencyType,
    descriptions,
    manufacturer,
    /* energyValue,
    proteins,
    fats,
    carbohydrates,
    energyUnits,
    weightUnits, */
    shelfLife,
    shelfLifeUnits,
    /* packaging,
    imageNames,
    checkedStars,
    reviewsCount, */
  } = product;

  return (
    <div className='product-details'>
      <p className='product-details__name'>
        Наименование: {name}
      </p>
      <p className='product-details__price'>
        <span className='product-details__price-number'>
          Цена: {price}
        </span>
        <span className='product-details__price-currency-type'>{currencyType}</span>
      </p>
      <p className='product-details__manufacturer'>
        Производитель: {manufacturer}
      </p>
      <p className='product-details__shelf-life'>
        <span className='product-details__shelf-life-number'>
          Срок годности: {shelfLife}
        </span>
        <span className='product-details__shelf-life-units'>{shelfLifeUnits}</span>
      </p>
      <p className='product-details__descriptions'>
        Описание: {descriptions}
      </p>
    </div>
  );
}

ProductDetails.propTypes = {
  productId: PropTypes.number,
  products: ProductsType,
};

ProductDetails.defaultProps = {
  productId: -1,
  products: defaultProducts,
};

export default ProductDetails;
