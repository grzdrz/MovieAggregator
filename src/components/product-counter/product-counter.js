import React from "react";

import "./product-counter.scss";

class ProductCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePlusButtonClick = (event) => {
    event.preventDefault();

    this.props.shoppingCartPlusAction(this.props.productId);
  };

  handleMinusButtonClick = (event) => {
    event.preventDefault();

    this.props.shoppingCartMinusAction(this.props.productId);
  }

  render() {
    const targetProduct = this.props.shoppingCart.find((product) => product.productId === this.props.productId);
    return (
      <div className="product-counter">
        <button className={
          `product-counter__minus-button 
          ${targetProduct && targetProduct.productCount > 0 ? "product-counter__minus-button_active" : ""}`}
          onClick={this.handleMinusButtonClick}>-</button>
        <span className="product-counter__value">{targetProduct ? targetProduct.productCount : 0}</span>
        <button className="product-counter__plus-button" onClick={this.handlePlusButtonClick}>+</button>
      </div>
    );
  }
}

export default ProductCounter;
