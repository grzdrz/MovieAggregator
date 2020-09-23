/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ProductCounter from '../product-counter/product-counter.jsx';

import ProductType from '../../store/Products/ProductType';
import ChosenProductsType from '../../store/ShoppingCart/ChosenProductsType';
import defaultProducts from '../../store/Products/initialState';
import defaultShoppingCart from '../../store/ShoppingCart/initialState';

import './shopping-cart.scss';

function ShoppingCart(props) {
  const {
    products,
    chosenProducts,
    shoppingCartPlusAction,
    shoppingCartMinusAction,
  } = props;

  const [isFormOpened, setIsFormOpened] = useState(false);

  const handleDropdownLeave = (event) => {
    const cart = event.target.closest('.shopping-cart');
    const isMinusButton = event.target.classList.contains('product-counter__minus-button');
    if (!cart && !isMinusButton) {
      setIsFormOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDropdownLeave);
    return () => {
      document.removeEventListener('click', handleDropdownLeave);
    };
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleIconClick = () => {
    setIsFormOpened(!isFormOpened);
  };

  const sumCount = chosenProducts.reduce((sum, product) => {
    if (product.productCount !== undefined) {
      const newSum = sum + product.productCount;
      return newSum;
    }
    return sum;
  }, 0);
  const sumPrice = products.reduce((sum, product) => {
    const shoppingCartProduct = chosenProducts.find((item) => item.productId === product.id);
    if (shoppingCartProduct) {
      const newSum = sum + product.price * shoppingCartProduct.productCount;
      return newSum;
    }
    return sum;
  }, 0);

  return (
    <div className='shopping-cart'>
      <div className='shopping-cart__icon' onClick={handleIconClick}>
        <p className='shopping-cart__main-image'>shopping_cart</p>
        <p className='shopping-cart__products-count'>
          <span className='shopping-cart__products-count-number'>{sumCount}</span>
        </p>
      </div>

      <form
        className={`shopping-cart__form ${isFormOpened ? 'shopping-cart__form_opened' : ''}`}
        onSubmit={handleFormSubmit}
      >
        <div className='shopping-cart__selected-products-table'>
          <div className='shopping-cart__table-cell shopping-cart__title-cell'>id</div>
          <div className='shopping-cart__table-cell shopping-cart__title-cell'>Количество</div>
          <div className='shopping-cart__table-cell shopping-cart__title-cell'>Наименование</div>
          <div className='shopping-cart__table-cell shopping-cart__title-cell'>Счетчик</div>
          {chosenProducts.map((product) => {
            if (product.productCount > 0) {
              return (
                <React.Fragment key={`shopping-cart__form-product_${product.productId}`}>
                  <div className='shopping-cart__table-cell'>
                    <input
                      className='shopping-cart__cell-input'
                      type='text'
                      defaultValue={product.productId}
                      onChange={() => { }}
                    />
                  </div>
                  <div className='shopping-cart__table-cell'>
                    <input
                      className='shopping-cart__cell-input'
                      type='text'
                      defaultValue={product.productCount}
                      onChange={() => { }}
                    />
                  </div>
                  <div className='shopping-cart__table-cell'>{products.find((item) => item.id === product.productId).name}</div>
                  <div className='shopping-cart__table-cell'>
                    <ProductCounter
                      chosenProducts={chosenProducts}
                      shoppingCartPlusAction={shoppingCartPlusAction}
                      shoppingCartMinusAction={shoppingCartMinusAction}
                      productId={product.productId}
                    />
                  </div>
                </React.Fragment>
              );
            }
          })}
        </div>
        <div className='shopping-cart__total-value'>
          <span className='shopping-cart__total-value-text'>Суммарное количество: </span>
          <span className='shopping-cart__total-value-input'>{sumCount}</span>
          {/* <input
              className='shopping-cart__total-value-input'
              value={sumCount}
              disabled
              onChange={() => { }}
            /> */}
        </div>
        <div className='shopping-cart__total-price'>
          <span className='shopping-cart__total-price-text'>Суммарная цена: </span>
          <span className='shopping-cart__total-price-value'>{sumPrice}</span>
          <span className='shopping-cart__total-price-currency'>{products[0].currencyType}</span>
        </div>
      </form>
    </div>
  );
}

ShoppingCart.propTypes = {
  products: PropTypes.arrayOf(ProductType),
  chosenProducts: ChosenProductsType,
  shoppingCartPlusAction: PropTypes.func,
  shoppingCartMinusAction: PropTypes.func,
};

ShoppingCart.defaultProps = {
  products: defaultProducts.allProducts,
  chosenProducts: defaultShoppingCart.chosenProducts,
  shoppingCartPlusAction: () => { },
  shoppingCartMinusAction: () => { },
};

export default ShoppingCart;
