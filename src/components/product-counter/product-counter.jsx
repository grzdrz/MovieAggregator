import React from 'react';
import './product-counter.scss';

class ProductCounter extends React.Component {
  handlePlusButtonClick = (event) => {
    event.preventDefault();
    const { productId, shoppingCartPlusAction } = this.props;

    shoppingCartPlusAction(productId);
  };

  handleMinusButtonClick = (event) => {
    event.preventDefault();
    const { productId, shoppingCartMinusAction } = this.props;

    shoppingCartMinusAction(productId);
  }

  render() {
    const { shoppingCart, productId } = this.props;
    const targetProduct = shoppingCart.find((product) => product.productId === productId);
    return (
      <div className='product-counter'>
        <button
          className={
            `product-counter__minus-button 
          ${targetProduct && targetProduct.productCount > 0 ? 'product-counter__minus-button_active' : ''}`}
          onClick={this.handleMinusButtonClick}
          type="button"
        >
          -
        </button>
        <span className='product-counter__value'>{targetProduct ? targetProduct.productCount : 0}</span>
        <button
          className='product-counter__plus-button'
          onClick={this.handlePlusButtonClick}
          type="button"
        >
          +
        </button>
      </div>
    );
  }
}

export default ProductCounter;
