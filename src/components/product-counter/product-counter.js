import React from "react";

import "./product-counter.scss";

class ProductCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePlusButtonClick = (event) => {
    event.preventDefault();

    this.props.shoppingCartAction(this.props.productId);
  };

  render() {
    const targetProduct = this.props.shoppingCart.find((product) => product.productId === this.props.productId);
    return (
      <div className="product-counter">
        <button className="product-counter__minus-button" /* onClick={} */>-</button>
        <span className="product-counter__value">{targetProduct ? targetProduct.productCount : 0}</span>
        <button className="product-counter__plus-button" onClick={this.handlePlusButtonClick}>+</button>
      </div>
    );
  }
}

export default ProductCounter;
