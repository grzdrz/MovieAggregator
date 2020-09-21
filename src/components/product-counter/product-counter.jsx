import React from 'react';
import PropTypes from 'prop-types';
import defaultShoppingCart from '../../store/ShoppingCart/initialState';
import ChosenProductsType from '../../store/ShoppingCart/ChosenProductsType';
import './product-counter.scss';

function ProductCounter(props) {
  const {
    productId,
    chosenProducts,
    shoppingCartPlusAction,
    shoppingCartMinusAction,
  } = props;

  const handlePlusButtonClick = (event) => {
    event.preventDefault();
    if (productId < 0) return;
    shoppingCartPlusAction(productId);
  };

  const handleMinusButtonClick = (event) => {
    event.preventDefault();
    if (productId < 0) return;
    shoppingCartMinusAction(productId);
  };

  const targetProduct = chosenProducts.find((product) => product.productId === productId);
  return (
    <div className='product-counter'>
      <button
        className={
          `product-counter__minus-button 
          ${targetProduct && targetProduct.productCount > 0 ? 'product-counter__minus-button_active' : ''}`
        }
        onClick={handleMinusButtonClick}
        type="button"
      >
        -
      </button>
      <span className='product-counter__value'>{targetProduct ? targetProduct.productCount : 0}</span>
      <button
        className='product-counter__plus-button'
        onClick={handlePlusButtonClick}
        type="button"
      >
        +
      </button>
    </div>
  );
}

ProductCounter.propTypes = {
  productId: PropTypes.number,
  chosenProducts: ChosenProductsType,
  shoppingCartPlusAction: PropTypes.func,
  shoppingCartMinusAction: PropTypes.func,
};

ProductCounter.defaultProps = {
  productId: -1,
  chosenProducts: defaultShoppingCart.chosenProducts,
  shoppingCartPlusAction: () => { },
  shoppingCartMinusAction: () => { },
};

export default ProductCounter;
